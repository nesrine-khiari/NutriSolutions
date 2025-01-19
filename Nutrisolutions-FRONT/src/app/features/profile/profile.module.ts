import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { HealthInfosComponent } from './health-infos/health-infos.component';
import { CoreModule } from 'src/app/core/core.module';
import { GetAgePipe } from 'src/app/core/pipes/get-age.pipe';

@NgModule({
  declarations: [ProfilePageComponent, HealthInfosComponent],
  imports: [CommonModule, SharedModule, MatSliderModule, FormsModule],
  exports: [ProfilePageComponent, HealthInfosComponent],
})
export class ProfileModule {}
