import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [LoginComponent, ResetPasswordComponent, SignupComponent],
  imports: [CommonModule,SharedModule, FormsModule,RouterModule,ReactiveFormsModule],
  exports: [LoginComponent, ResetPasswordComponent, SignupComponent],
})
export class AuthModule {}
