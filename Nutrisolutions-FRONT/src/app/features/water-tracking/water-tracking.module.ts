import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaterTrackingComponent } from './water-tracking/water-tracking.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [WaterTrackingComponent],
  declarations: [WaterTrackingComponent],
})
export class WaterTrackingModule {}
