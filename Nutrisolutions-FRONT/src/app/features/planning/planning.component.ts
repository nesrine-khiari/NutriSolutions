import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { generateFakeNutritionist } from 'src/app/core/helpers/faker.helper';
import { AppUtils } from 'src/app/core/utils/functions.utils';
import { SlotModel } from 'src/app/models/slot.model';
import { AuthService } from 'src/app/services/auth.service';
import { PlanningService } from 'src/app/services/planning.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: [
    './planning.component.css',
    '../../../assets/css/list-common.css',
  ],
})
export class PlanningComponent {
  actRoute = inject(ActivatedRoute);
  nutritionistId = this.actRoute.snapshot.params['nutritionistId'];
  timeSlots: string[] = [
    '8:00',
    '9:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
  ];
  reservedSlots: Slot[] = [];
  morningTimeSlots: string[] = ['8:00', '9:00', '10:00', '11:00'];
  afternoonTimeSlots: string[] = ['13:00', '14:00', '15:00', '16:00'];
  workDaysOfWeek: string[] = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
  ];

  selectedDate = new Date();

  morningSlots: Slot[] = [];
  afternoonSlots: Slot[] = [];

  toastr = inject(ToastrService);
  allDaysOfWeek = [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ];
  ngOnInit() {
    this.planningService.getReservedSlots(this.nutritionistId).subscribe({
      next: (slots) => {
        this.reservedSlots = slots.map((slot) => {
          return {
            date: new Date(slot.date),
            day: slot.day,
            time: slot.time,
            isReserved: true,
            reservedBy: slot.clientId,
            color: '#FFAD80',
          };
        });
        this.updateSlots(this.selectedDate.toDateString());
      },
    });
    this.updateSlots(this.selectedDate.toDateString());
  }
  updateSlots(selectedDate: string) {
    this.selectedDate = new Date(selectedDate);
    const currentDayIndex = this.selectedDate.getDay();
    console.log(currentDayIndex);

    const selectedDay = this.allDaysOfWeek[currentDayIndex];
    console.log(selectedDay);

    if (this.workDaysOfWeek.includes(selectedDay)) {
      const indexOfSelectedDay = this.workDaysOfWeek.indexOf(selectedDay);
      this.afternoonSlots = this.generateSlots(
        this.afternoonTimeSlots,
        indexOfSelectedDay
      );
      this.morningSlots = this.generateSlots(
        this.morningTimeSlots,
        indexOfSelectedDay
      );
    } else {
      console.log('jawna ahah');

      this.toastr.error('Weekends Are Off');
    }
  }
  generateSlots(timeSlots: string[], indexOfSelectedDay: number) {
    return new Array(timeSlots.length * this.workDaysOfWeek.length)
      .fill(null)
      .map((_, index) => {
        const dayIndex = Math.floor(index / timeSlots.length);
        const difference = dayIndex - indexOfSelectedDay;
        const selectedDate = new Date(this.selectedDate);
        const date = new Date(
          selectedDate.setDate(selectedDate.getDate() + difference)
        );
        const reservedBy =
          this.reservedSlots.find(
            (slot) =>
              slot.date?.toDateString() === date.toDateString() &&
              slot.time === timeSlots[index % timeSlots.length]
          )?.reservedBy ?? '';
        console.log('Reserved Slots', this.reservedSlots);
        console.log(reservedBy);

        return {
          date: date,
          day: this.workDaysOfWeek[dayIndex],
          time: timeSlots[index % timeSlots.length],
          isReserved: reservedBy !== '',
          reservedBy: reservedBy,
          color: '#ebebeb',
        };
      });
  }

  getRandomCoolColor(neighboursColors: string[]) {
    const pickedSlotColors = [
      '#FFAD80',
      '#6FF9AA',
      '#F7EE6E',
      '#FEE8AD',
      '#94C6FC',
    ];
    var randomIndex = Math.floor(Math.random() * pickedSlotColors.length);
    while (neighboursColors.includes(pickedSlotColors[randomIndex])) {
      var randomIndex = Math.floor(Math.random() * pickedSlotColors.length);
    }
    // Return the color in rgb format
    return pickedSlotColors[randomIndex];
  }
  planningService = inject(PlanningService);
  authService = inject(AuthService);
  pickSlot(
    index: number,
    userName: string = 'Houcem Hbiri',
    isMorning: boolean
  ) {
    const slots = isMorning ? this.morningSlots : this.afternoonSlots;
    const slot = slots[index];
    if (slot && !slot.isReserved) {
      const slotModel = new SlotModel(
        slot.date,
        slot.day,
        slot.time,
        this.authService.getUserId(),
        this.nutritionistId
      );
      this.planningService.reserveSlot(slotModel).subscribe({
        next: (reservedSlot) => {
          slot.isReserved = true;
          slot.reservedBy = this.authService.getUserName();
          var neighboursColors = [];

          if (index % 4 > 0) {
            neighboursColors.push(slots[index - 1].color);
          }
          if (index % 4 < 7) {
            neighboursColors.push(slots[index + 1].color);
          }

          if (index + 4 < slots.length)
            neighboursColors.push(slots[index + 4].color);
          if (index - 4 >= 0) neighboursColors.push(slots[index - 4].color);
          const color = this.getRandomCoolColor(neighboursColors);
          slots[index].color = color;
          this.toastr.success('Slot Reserved Successfully');
        },
        error: (error) => {
          this.toastr.error(AppUtils.getErrorMessage(error), 'Error');
        },
      });
    }
  }
}

export interface Slot {
  date: Date;
  day: string;
  time: string;
  isReserved: boolean;
  reservedBy: string;
  color: string;
}
