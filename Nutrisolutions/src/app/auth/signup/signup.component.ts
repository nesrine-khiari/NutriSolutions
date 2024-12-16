import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../../../assets/css/auth-common.css', './signup.component.css'],
})
export class SignupComponent {
  currentStep: number = 1;
  stepLabels: string[] = [
    'Account Type',
    'Account Information',
    'Profile Data',
    'Additionnal Information',
  ];
}
