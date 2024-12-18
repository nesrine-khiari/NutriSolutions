import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, NgModel } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    SignupComponent
 ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule  ],
  exports: [
    LoginComponent,
    ResetPasswordComponent,
    SignupComponent
  ]
})
export class AuthModule { }
