import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { generateFakeNutritionist } from 'src/app/core/helpers/faker.helper';
import { AppUtils } from 'src/app/core/utils/functions.utils';
import { ClientModel } from 'src/app/models/client.model';
import { SlotModel } from 'src/app/models/slot.model';
import { AuthService } from 'src/app/services/auth.service';
import { PlanningService } from 'src/app/services/planning.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: [
    '../../../assets/css/popup.css',
    './planning.component.css',
    '../../../assets/css/list-common.css',
  ],
})
export class PlanningComponent {
  actRoute = inject(ActivatedRoute);
  nutritionistId = this.actRoute.snapshot.params['nutritionistId'];
  clientUserName: string = '';
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
  allSlots: Slot[] = [];
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

  // morningSlots: Slot[] = [];
  // afternoonSlots: Slot[] = [];

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
  isReservationPopupVisible: boolean = false;
  isCancelPopupVisible: boolean = false;
  selectedIndex: number = 0;
  isMorning: boolean = true;
  ngOnInit() {
    this.clientUserName = this.authService.getUserName();
    this.planningService.getReservedSlots(this.nutritionistId).subscribe({
      next: (slots) => {
        this.reservedSlots = slots.map((slot) => {
          return {
            id: slot.id ?? '',
            date: new Date(slot.date),
            day: slot.day,
            time: slot.time,
            isReserved: true,
            reservedBy: (slot.client as ClientModel).name,
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
      // this.afternoonSlots = this.generateSlots(
      //   this.afternoonTimeSlots,
      //   indexOfSelectedDay
      // );
      // this.morningSlots = this.generateSlots(
      //   this.morningTimeSlots,
      //   indexOfSelectedDay
      // );
      this.allSlots = this.generateSlots(
        [...this.morningTimeSlots, '12:00', ...this.afternoonTimeSlots],
        indexOfSelectedDay
      );
    } else {
      console.log('jawna ahah');

      this.toastr.error('Weekends Are Off');
    }
  }
  private generateSlots(timeSlots: string[], indexOfSelectedDay: number) {
    return new Array(timeSlots.length * this.workDaysOfWeek.length)
      .fill(null)
      .map((_, index) => {
        const dayIndex = Math.floor(index / timeSlots.length);
        const difference = dayIndex - indexOfSelectedDay;
        const selectedDate = new Date(this.selectedDate);
        const date = new Date(
          selectedDate.setDate(selectedDate.getDate() + difference)
        );
        const reservedSlot = this.reservedSlots.find(
          (slot) =>
            slot.date?.toDateString() === date.toDateString() &&
            slot.time === timeSlots[index % timeSlots.length]
        );
        const reservedBy = reservedSlot?.reservedBy ?? '';
        const id = reservedSlot?.id ?? '';
        console.log('Reserved Slots', this.reservedSlots);
        console.log(reservedBy);

        return {
          id: id,
          date: date,
          day: this.workDaysOfWeek[dayIndex],
          time: timeSlots[index % timeSlots.length],
          isReserved: reservedBy !== '',
          reservedBy: reservedBy,
          color: reservedBy ? this.getRandomCoolColor() : '#ebebeb',
        };
      });
  }

  private getRandomCoolColor() {
    // index: number, isMorning: boolean
    const pickedSlotColors = [
      '#FFAD80',
      '#6FF9AA',
      '#F7EE6E',
      '#FEE8AD',
      '#94C6FC',
    ];
    const neighboursColors = this.getNeighbourColors();
    var randomIndex = 0;
    while (neighboursColors.includes(pickedSlotColors[randomIndex])) {
      randomIndex = Math.floor(Math.random() * pickedSlotColors.length);
    }
    // Return the color in rgb format
    return pickedSlotColors[randomIndex];
  }
  private getNeighbourColors() {
    var neighboursColors = [];

    if (this.selectedIndex % 9 != 5 && this.selectedIndex % 5 != 0) {
      neighboursColors.push(this.allSlots[this.selectedIndex - 1].color);
    }
    if ((this.selectedIndex + 1) % 9 != 4 && this.selectedIndex % 9 != 8) {
      neighboursColors.push(this.allSlots[this.selectedIndex + 1].color);
    }
    if (this.selectedIndex + 9 < this.allSlots.length)
      neighboursColors.push(this.allSlots[this.selectedIndex + 9].color);
    if (this.selectedIndex - 9 >= 0)
      neighboursColors.push(this.allSlots[this.selectedIndex - 9].color);
    return neighboursColors;
  }
  planningService = inject(PlanningService);
  authService = inject(AuthService);
  pickSlot = () => {
    // const slots = this.isMorning ? this.morningSlots : this.afternoonSlots;
    const slot = this.allSlots[this.selectedIndex];
    if (slot && !slot.isReserved) {
      const slotModelDto = {
        date: slot.date,
        day: slot.day,
        time: slot.time,
        clientId: this.authService.getUserId(),
        nutritionistId: this.nutritionistId,
      };

      this.planningService.reserveSlot(slotModelDto).subscribe({
        next: (reservedSlot) => {
          slot.isReserved = true;
          slot.reservedBy = this.clientUserName;

          const color = this.getRandomCoolColor();
          this.allSlots[this.selectedIndex].color = color;
          this.toastr.success('Slot Reserved Successfully');
        },
        error: (error) => {
          this.toastr.error(AppUtils.getErrorMessage(error), 'Error');
        },
      });
      this.closeReservationPopup();
    }
  };
  cancelReservation = () => {
    // const slots = this.isMorning ? this.morningSlots : this.afternoonSlots;
    const slot = this.allSlots[this.selectedIndex];
    if (slot && slot.isReserved) {
      this.planningService.cancelSlotReservation(slot.id).subscribe({
        next: (reservedSlot) => {
          slot.isReserved = false;
          slot.reservedBy = '';
          slot.color = '#ebebeb';
          this.toastr.success('Slot Reservation Cancelled Successfully');
        },
        error: (error) => {
          this.toastr.error(AppUtils.getErrorMessage(error), 'Error');
        },
      });
      this.closeCancelnPopup();
    }
  };

  // Method to show the popup
  showReservationPopup = (index: number) => {
    this.isReservationPopupVisible = true;
    this.selectedIndex = index;
  };

  // Method to hide the popup
  closeReservationPopup = () => {
    this.isReservationPopupVisible = false;
  };
  // Method to show the popup
  showCancelPopup = (index: number) => {
    this.isCancelPopupVisible = true;

    this.selectedIndex = index;
  };

  // Method to hide the popup
  closeCancelnPopup = () => {
    this.isCancelPopupVisible = false;
  };
}

export interface Slot {
  id: string;
  date: Date;
  day: string;
  time: string;
  isReserved: boolean;
  reservedBy: string;
  color: string;
}
