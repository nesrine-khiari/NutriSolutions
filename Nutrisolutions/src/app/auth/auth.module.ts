import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [LoginComponent, ResetPassComponent, SignupComponent],
  imports: [CommonModule, SharedModule],
  exports: [LoginComponent, ResetPassComponent, SignupComponent],
})
export class AuthModule {}
