import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthBackgroundComponent } from './components/auth-background/auth-background.component';
import { AuthInputComponent } from './components/auth-input/auth-input.component';
import { ButtonComponent } from './components/button/button.component';
import { StepsComponent } from './components/steps/steps.component';

@NgModule({
  declarations: [
    AuthBackgroundComponent,
    AuthInputComponent,
    ButtonComponent,
    StepsComponent,
  ],
  imports: [CommonModule],
  exports: [
    AuthBackgroundComponent,
    AuthInputComponent,
    ButtonComponent,
    StepsComponent,
  ],
})
export class SharedModule {}
