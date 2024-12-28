import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, NgModel } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginComponent, ResetPasswordComponent, SignupComponent],
  imports: [CommonModule,SharedModule, FormsModule,RouterModule],
  exports: [LoginComponent, ResetPasswordComponent, SignupComponent],
})
export class AuthModule {}
