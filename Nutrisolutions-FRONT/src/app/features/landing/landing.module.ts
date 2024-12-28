import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SharedModule } from '../../shared/shared.module';
import { TipComponent } from './components/tip/tip.component';
import { WaterTrackingModule } from '../water-tracking/water-tracking.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LandingPageComponent, TipComponent],
  imports: [CommonModule, SharedModule, WaterTrackingModule, RouterModule],
  exports: [LandingPageComponent],
})
export class LandingModule {}
