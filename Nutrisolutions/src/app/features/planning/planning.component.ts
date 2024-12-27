import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { generateFakeNutritionist } from 'src/app/core/helpers/faker.helper';
import { AppUtils } from 'src/app/core/utils/functions.utils';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: [
    './planning.component.css',
    '../../../assets/css/list-common.css',
  ],
})
export class PlanningComponent {
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

        return {
          id: index,
          date: date,
          day: this.workDaysOfWeek[dayIndex],
          time: timeSlots[index % timeSlots.length],
          isReserved: false,
          reservedBy: '',
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
  pickSlot(
    index: number,
    userName: string = 'Houcem Hbiri',
    isMorning: boolean
  ) {
    const slots = isMorning ? this.morningSlots : this.afternoonSlots;
    const slot = slots[index];
    if (slot && !slot.isReserved) {
      slot.isReserved = true;
      slot.reservedBy = userName;
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
    }
  }
  getInitials(fullName: string) {
    return AppUtils.getInitials(fullName);
  }
}

export interface Slot {
  id: number;
  date: Date | null;
  day: string | null;
  time: string | null;
  isReserved: boolean;
  reservedBy: string;
  color: string;
}
