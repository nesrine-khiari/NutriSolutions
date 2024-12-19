import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, NgModel } from '@angular/forms';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [LoginComponent, ResetPasswordComponent, SignupComponent],
  imports: [CommonModule, SharedModule, FormsModule, CoreModule],
  exports: [LoginComponent, ResetPasswordComponent, SignupComponent],
})
export class AuthModule {}
