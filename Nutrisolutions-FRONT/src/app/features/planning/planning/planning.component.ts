import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { generateFakeNutritionist } from 'src/app/core/helpers/faker.helper';
import { AppUtils } from 'src/app/core/utils/functions.utils';
import { ClientModel, UserRoleEnum } from 'src/app/models/client.model';
import { StarsCountEnum } from 'src/app/models/nutritionist.model';
import { CreateSlotModelDto, SlotModel } from 'src/app/models/slot.model';
import { AuthService } from 'src/app/services/auth.service';
import { LoggerService } from 'src/app/services/logger.service';
import { PlanningService } from 'src/app/services/planning.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: [
    '../../../../assets/css/popup.css',
    './planning.component.css',
    '../../../../assets/css/list-common.css',
  ],
})
export class PlanningComponent {
  actRoute = inject(ActivatedRoute);
  nutritionistId = this.actRoute.snapshot.params['nutritionistId'];
  clientUserName: string = '';
  userRole: string = '';
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

  selectedDate!: Date;

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
  isUnavailablePopupVisible: boolean = false;
  isRatingPopupVisible: boolean = false;
  selectedIndex: number = 0;
  isMorning: boolean = true;
  currentDate = new Date();
  date = new Date('2025-08-08');
  starOptions = Object.values(StarsCountEnum);
  starControl: FormControl = new FormControl(StarsCountEnum.One);
  logger = inject(LoggerService);
  constructor() {}
  ngOnInit() {
    this.selectedDate = new Date();
    this.clientUserName = this.authService.getUserName();
    this.userRole = this.authService.getUserRole();
    this.planningService
      .getUnavailableSlotsByNutritionist(this.nutritionistId)
      .subscribe({
        next: (slots) => {
          this.logger.debug('Raw slots:', slots);
          this.reservedSlots = slots.map((slot) => {
            this.logger.debug('Mapping slot:', slot);
            return {
              id: slot.id ?? '',
              date: new Date(slot.date),
              day: slot.day,
              time: slot.time,
              isReservation: slot.isReservation,
              isReserved: true,
              rating: slot.rating,
              reservedBy: slot.client ? (slot.client as ClientModel)?.name : '',
              color: '#FFAD80',
            };
          });
          this.logger.debug('Reserved slots:', this.reservedSlots);
          this.updateSlots(this.selectedDate.toISOString());
        },
        error: (err) => {
          this.logger.error('Error fetching unavailable slots:', err);
        },
      });
  }
  updateSlots(selectedDate: string) {
    this.selectedDate = new Date(selectedDate);
    const currentDayIndex = this.selectedDate.getDay();
    this.logger.debug('Current Day Index', currentDayIndex);

    const selectedDay = this.allDaysOfWeek[currentDayIndex];
    this.logger.debug('Selected Day', selectedDay);

    if (this.workDaysOfWeek.includes(selectedDay)) {
      const indexOfSelectedDay = this.workDaysOfWeek.indexOf(selectedDay);
      this.allSlots = this.generateSlots(
        [...this.morningTimeSlots, '12:00', ...this.afternoonTimeSlots],
        indexOfSelectedDay
      );
    } else {
      this.toastr.error('Les week-ends sont inallouables');
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
        this.logger.debug('Reserved Slots', this.reservedSlots);
        this.logger.debug('Is reserved', reservedSlot?.isReserved);

        return {
          id: id,
          date: date,
          day: this.workDaysOfWeek[dayIndex],
          time: timeSlots[index % timeSlots.length],
          isReservation: reservedSlot?.isReservation ?? false,
          isReserved: reservedSlot?.isReserved ?? false,
          reservedBy: reservedBy,
          rating: reservedSlot?.rating ?? 0,
          color: reservedSlot?.isReservation
            ? this.getRandomCoolColor()
            : reservedSlot?.isReserved
            ? '#ff6b6b'
            : '#ebebeb',
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
    // const neighboursColors = this.getNeighbourColors();
    var randomIndex = 0;
    // while (neighboursColors.includes(pickedSlotColors[randomIndex])) {
    randomIndex = Math.floor(Math.random() * pickedSlotColors.length);
    // }
    // Return the color in rgb format
    return pickedSlotColors[randomIndex];
  }
  private getNeighbourColors() {
    var neighboursColors = [];

    if (
      this.allSlots[this.selectedIndex - 1].color !== '#ebebeb' &&
      this.selectedIndex % 9 != 5 &&
      this.selectedIndex % 5 != 0
    ) {
      neighboursColors.push(this.allSlots[this.selectedIndex - 1].color);
    }
    if (
      this.allSlots[this.selectedIndex + 1].color !== '#ebebeb' &&
      (this.selectedIndex + 1) % 9 != 4 &&
      this.selectedIndex % 9 != 8
    ) {
      neighboursColors.push(this.allSlots[this.selectedIndex + 1].color);
    }
    if (
      this.allSlots[this.selectedIndex + 9].color !== '#ebebeb' &&
      this.selectedIndex + 9 < this.allSlots.length
    )
      neighboursColors.push(this.allSlots[this.selectedIndex + 9].color);
    if (
      this.allSlots[this.selectedIndex - 9].color !== '#ebebeb' &&
      this.selectedIndex - 9 >= 0
    )
      neighboursColors.push(this.allSlots[this.selectedIndex - 9].color);
    return neighboursColors;
  }
  planningService = inject(PlanningService);
  authService = inject(AuthService);

  pickSlot = () => {
    let slot = this.allSlots[this.selectedIndex];
    let slotModelDto: CreateSlotModelDto;

    if (slot && !slot.isReserved) {
      if (this.userRole == UserRoleEnum.CLIENT.toString()) {
        slotModelDto = {
          date: slot.date,
          day: slot.day,
          time: slot.time,
          isReservation: true,
          clientId: this.authService.getUserId(),
          nutritionistId: this.nutritionistId,
        };
      } else {
        slotModelDto = {
          date: slot.date,
          day: slot.day,
          time: slot.time,
          isReservation: false,
          nutritionistId: this.nutritionistId,
        };
      }
      this.planningService.addSlot(slotModelDto).subscribe({
        next: (reservedSlot) => {
          slot.id = reservedSlot.id ?? '';
          slot.reservedBy = reservedSlot.isReservation
            ? this.clientUserName
            : '';
          this.logger.debug('Reserved By', slot.reservedBy);

          slot.isReserved = true;
          slot.isReservation = slotModelDto.isReservation;
          const color = reservedSlot.isReservation
            ? this.getRandomCoolColor()
            : '#ff6b6b';
          slot.color = color;
          this.toastr.success('Créneau réservé avec succès');
          if (slotModelDto.isReservation) {
            this.closeReservationPopup();
          } else {
            this.closeUnavailablePopup();
          }
        },
        error: (error) => {
          this.toastr.error(AppUtils.getErrorMessage(error), 'Erreur');
        },
      });
    }
  };
  cancelReservation = () => {
    // const slots = this.isMorning ? this.morningSlots : this.afternoonSlots;
    const slot = this.allSlots[this.selectedIndex];
    if (slot && slot.isReserved) {
      this.planningService.cancelSlotReservation(slot.id).subscribe({
        next: (reservedSlot) => {
          slot.isReserved = false;
          slot.isReservation = false;

          slot.reservedBy = '';
          slot.color = '#ebebeb';
          this.toastr.success('Réservation de créneau annulée avec succès');
        },
        error: (error) => {
          this.toastr.error(AppUtils.getErrorMessage(error), 'Erreur');
        },
      });

      this.closeCancelnPopup();
    }
  };
  addRating = () => {
    let slot = this.allSlots[this.selectedIndex];
    this.planningService.addRating(slot.id, this.starControl.value).subscribe({
      next: () => {
        slot.rating = this.starControl.value;
        this.toastr.success('Évaluation ajoutée avec succès');
      },
      error: (error) => {
        this.toastr.error(AppUtils.getErrorMessage(error), 'Erreur');
      },
    });

    this.closeRatingPopup();
  };
  // Method to show the popup
  showReservationPopup = (index: number) => {
    this.isReservationPopupVisible = true;
    this.selectedIndex = index;
  };
  // Method to show the popup
  showAddUnavailableSlotPopup = (index: number) => {
    this.isUnavailablePopupVisible = true;
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
  // Method to show the popup
  showRatingPopup = (index: number) => {
    this.selectedIndex = index;
    this.isRatingPopupVisible = true;
  };

  // Method to hide the popup
  closeCancelnPopup = () => {
    this.isCancelPopupVisible = false;
  };
  closeUnavailablePopup = () => {
    this.isUnavailablePopupVisible = false;
  };
  // Method to hide the popup
  closeRatingPopup = () => {
    this.isRatingPopupVisible = false;
    this.starControl.setValue(StarsCountEnum.One);
  };
  getWeekInMonth(date: Date): number {
    return AppUtils.getWeekInMonth(date);
  }
}

export interface Slot {
  id: string;
  date: Date;
  day: string;
  time: string;
  isReservation?: boolean;
  isReserved: boolean;
  reservedBy: string;
  rating: number | undefined;
  color: string;
}
