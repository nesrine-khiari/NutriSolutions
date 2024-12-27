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
@NgModule({
  declarations: [
    HomePageComponent,
    TopListComponent,
    HomeNutritionisteComponent,
    StatsComponent,
    UpcomingPatientsComponent,
    UpcomingPatientComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    WaterTrackingModule,
    NutritionistsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [HomePageComponent, HomeNutritionisteComponent],
})
export class HomeModule {}
