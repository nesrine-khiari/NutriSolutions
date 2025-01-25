import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { NavBarComponent } from 'src/app/shared/components/nav-bar/nav-bar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { WaterTrackingModule } from '../water-tracking/water-tracking.module';
import { TopListComponent } from './top-list/top-list.component';
import { NutritionistsModule } from '../nutritionists/nutritionists.module';
import { HomeNutritionisteComponent } from './home-nutritioniste/home-nutritioniste.component';
import { StatsComponent } from './components/stats/stats.component';
import { UpcomingPatientsComponent } from './components/upcoming-patients/upcoming-patients.component';
import { UpcomingPatientComponent } from './components/upcoming-patient/upcoming-patient.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { NutritionistsTableComponent } from './nutritionists-table/nutritionists-table.component';
import { CoreModule } from 'src/app/core/core.module';
import { AppointmentCardComponent } from './components/appointment-card/appointment-card.component';
@NgModule({
  declarations: [
    HomePageComponent,
    TopListComponent,
    HomeNutritionisteComponent,
    StatsComponent,
    UpcomingPatientsComponent,
    UpcomingPatientComponent,
    AdminHomeComponent,
    NutritionistsTableComponent,
    AppointmentCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    WaterTrackingModule,
    NutritionistsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CoreModule,
  ],
  exports: [
    HomePageComponent,
    AdminHomeComponent,
    HomeNutritionisteComponent,
    AppointmentCardComponent,
  ],
})
export class HomeModule {}
