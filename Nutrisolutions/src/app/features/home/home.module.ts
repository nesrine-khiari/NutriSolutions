import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { NavBarComponent } from 'src/app/shared/components/nav-bar/nav-bar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { WaterTrackingModule } from '../water-tracking/water-tracking.module';
import { TopListComponent } from './top-list/top-list.component';
import { NutritionistsModule } from '../nutritionists/nutritionists.module';

@NgModule({
  declarations: [HomePageComponent, TopListComponent],
  imports: [
    CommonModule,
    SharedModule,
WaterTrackingModule,    NutritionistsModule,
  ],
  exports: [HomePageComponent],
})
export class HomeModule {}
