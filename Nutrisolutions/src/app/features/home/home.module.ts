import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { NavBarComponent } from 'src/app/shared/components/nav-bar/nav-bar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { WaterTrackingModule } from '../water-tracking/water-tracking.module';
import { TopListComponent } from './top-list/top-list.component';
import { NutritionistsModule } from '../nutritionists/nutritionists.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { NutritionistsTableComponent } from './nutritionists-table/nutritionists-table.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [HomePageComponent, TopListComponent, AdminHomeComponent, NutritionistsTableComponent],
  imports: [
    CommonModule,
    SharedModule,
    WaterTrackingModule,
    NutritionistsModule,
    CoreModule
  ],
  exports: [HomePageComponent, AdminHomeComponent],
})
export class HomeModule {}
