import { Component, inject } from '@angular/core';
import { map, Observable, pipe, tap } from 'rxjs';
// import { generateFakeClient } from 'src/app/core/helpers/faker.helper';
import { ClientModel } from 'src/app/models/client.model';
import { NutritionistModel } from 'src/app/models/nutritionist.model';
import { ObjectifEnum } from 'src/app/models/recipe.model';
import { SlotModel } from 'src/app/models/slot.model';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { NutritionistsService } from 'src/app/services/nutritionists.service';
import { PlanningService } from 'src/app/services/planning.service';

@Component({
  selector: 'app-home-nutritioniste',
  templateUrl: './home-nutritioniste.component.html',
  styleUrls: ['./home-nutritioniste.component.css'],
})
export class HomeNutritionisteComponent {
  // nutritionist: NutritionistModel | null = null;
  // patientsList: ClientModel[] = [];
  // objectif: ObjectifEnum = ObjectifEnum.MUSCLER;
  // clientService = inject(ClientService);
  // nutritionistService = inject(NutritionistsService);
  // planningService = inject(PlanningService);
  // authService = inject(AuthService);
  // userId: string = '';
  // // reservations: SlotModel[] = [];
  // reservations$!: Observable<SlotModel[]>;
  // todayReservations$!: Observable<SlotModel[]>;
  // recentReservations$!: Observable<SlotModel[]>;
  // currentDate: Date = new Date();
  // constructor() {
  //   this.userId = this.authService.getUserId();
  //   this.nutritionistService.getNutritionistById(this.userId).subscribe({
  //     next: (response) => {
  //       this.nutritionist = response;
  //     },
  //     error: (err) => {
  //       console.error('Upload Failed:', err);
  //     },
  //   });
  // }
  // ngOnInit() {
  //   console.log('====================================');
  //   console.log('hello ' + this.currentDate);
  //   console.log('====================================');
  //   this.reservations$ = this.planningService.getReservedSlotsByNutritionist(
  //     this.userId
  //   );
  //   this.todayReservations$ = this.reservations$.pipe(
  //     map((reservations: SlotModel[]) =>
  //       reservations.filter((reservation) => {
  //         // Parse reservation.date and compare it to the desired date
  //         const reservationDate = new Date(reservation.date).toDateString();
  //         return reservationDate === this.currentDate.toDateString();
  //       })
  //     )
  //   );
  //   this.recentReservations$ = this.reservations$.pipe(
  //     map((reservations: SlotModel[]) =>
  //       reservations.filter((reservation) => {
  //         const reservationDateMonth = new Date(reservation.date).getMonth();
  //         const reservationDateYear = new Date(reservation.date).getFullYear();
  //         return (
  //           reservationDateMonth === this.currentDate.getMonth() &&
  //           reservationDateYear === this.currentDate.getFullYear()
  //         );
  //       })
  //     )
  //   );

  //   this.nutritionistService
  //     .getPatientsByNutritionist(this.userId)
  //     .subscribe((clients: ClientModel[]) => {
  //       this.patientsList = clients;
  //     });
  // }

  nutritionist: NutritionistModel | null = null;
  patientsList: ClientModel[] = [];
  objectif: ObjectifEnum = ObjectifEnum.MUSCLER;
  clientService = inject(ClientService);
  nutritionistService = inject(NutritionistsService);
  planningService = inject(PlanningService);
  authService = inject(AuthService);
  userId: string = '';
  reservations: SlotModel[] = [];
  isLoading: boolean = false;
  todayReservations: SlotModel[] = [];
  recentReservations: SlotModel[] = [];
  currentDate: Date = new Date();
  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.nutritionistService.getNutritionistById(this.userId).subscribe({
      next: (response) => {
        this.nutritionist = response;
      },
      error: (err) => {
        console.error('Upload Failed:', err);
      },
    });
    console.log('====================================');
    console.log('hello ' + this.currentDate);
    console.log('====================================');
    this.planningService.getReservedSlotsByNutritionist(this.userId).subscribe({
      next: (reservations) => {
        this.reservations = reservations;
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      },
      error: (err) => {
        console.error('Failed to fetch reservations:', err);
      },
    });
    this.todayReservations = this.reservations.filter((reservation) => {
      // Parse reservation.date and compare it to the desired date
      const reservationDate = new Date(reservation.date).toDateString();
      return reservationDate === this.currentDate.toDateString();
    });

    this.recentReservations = this.reservations.filter((reservation) => {
      const reservationDateMonth = new Date(reservation.date).getMonth();
      const reservationDateYear = new Date(reservation.date).getFullYear();
      return (
        reservationDateMonth === this.currentDate.getMonth() &&
        reservationDateYear === this.currentDate.getFullYear()
      );
    });

    this.nutritionistService
      .getPatientsByNutritionist(this.userId)
      .subscribe((clients: ClientModel[]) => {
        this.patientsList = clients;
      });
  }
}
