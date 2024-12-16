import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthBackgroundComponent } from './components/auth-background/auth-background.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { ProgressIndicatorComponent } from './components/progress-indicator/progress-indicator.component';
import { ButtonComponent } from './components/button/button.component';
@NgModule({
  declarations: [
    AuthBackgroundComponent,
    InputFieldComponent,
    ProgressIndicatorComponent,
    ButtonComponent
  ],
  imports: [CommonModule],
  exports: [
    AuthBackgroundComponent,
    InputFieldComponent,
    ProgressIndicatorComponent,
    ButtonComponent
  ]

})
export class SharedModule {}
