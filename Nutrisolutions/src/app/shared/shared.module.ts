import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthBackgroundComponent } from './components/auth-background/auth-background.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { ProgressIndicatorComponent } from './components/progress-indicator/progress-indicator.component';
import { ButtonComponent } from './components/button/button.component';
import { AuthDropdownComponent } from './components/auth-dropdown/auth-dropdown.component';
import { AuthAccountTypeComponent } from './components/auth-account-type/auth-account-type.component';
import { SvgBoxComponent } from './components/svg-box/svg-box.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { InputNumberFieldComponent } from './components/input-number-field/input-number-field.component';
@NgModule({
  declarations: [
    AuthBackgroundComponent,
    InputFieldComponent,
    ProgressIndicatorComponent,
    ButtonComponent,
    AuthDropdownComponent,
    AuthAccountTypeComponent,
    SvgBoxComponent,
    InputNumberFieldComponent,
  ],
  imports: [CommonModule, FormsModule, CoreModule],
  exports: [
    AuthBackgroundComponent,
    InputFieldComponent,
    ProgressIndicatorComponent,
    ButtonComponent,
    AuthDropdownComponent,
    AuthAccountTypeComponent,
    SvgBoxComponent,
  ],
})
export class SharedModule {}
