import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../../../assets/css/auth-common.css', './signup.component.css'],
})
export class SignupComponent {
  currentStep: number = 0;
  stepLabels: string[] = [
    'Account Type',
    'Account Information',
    'Profile Data',
    'Additionnal Information',
    'Profile Pictrue',
  ];

  goNext(): void {
    this.currentStep++;
    console.log(this.currentStep);
  }
  goPrevious(): void {
    this.currentStep--;
    console.log(this.currentStep);
  }

  //For the first step
  accountTypes = [
    {
      type: 'Nutritionniste',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      type: 'Client',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
  ];

  selectedType: string = '';

  selectType(type: string) {
    this.selectedType = type;
  }
}
