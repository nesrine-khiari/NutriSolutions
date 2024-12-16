import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../../../assets/css/auth.css', './signup.component.css'],
})
export class SignupComponent {
  currentStep: number = 0;
  stepLabels: string[] = ['Account', 'Account', 'Account', 'Account'];
}
