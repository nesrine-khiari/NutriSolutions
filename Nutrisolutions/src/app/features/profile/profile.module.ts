import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { HealthInfosComponent } from './health-infos/health-infos.component';

@NgModule({
  declarations: [ProfilePageComponent, HealthInfosComponent],
  imports: [CommonModule, SharedModule, MatSliderModule, FormsModule],
  exports: [ProfilePageComponent,HealthInfosComponent],
})
export class ProfileModule {}
