import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SharedModule } from '../../shared/shared.module';
import { TipComponent } from './components/tip/tip.component';

@NgModule({
  declarations: [LandingPageComponent, TipComponent],
  imports: [CommonModule, SharedModule],
  exports: [LandingPageComponent],
})
export class LandingModule {}
