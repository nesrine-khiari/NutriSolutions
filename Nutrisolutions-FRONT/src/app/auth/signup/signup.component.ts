import { Component, ElementRef, ViewChild } from '@angular/core';

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
  strengthLevels: { [key: string]: RegExp } = {
    strong:
      /^(?=.*[A-Z])(?=.*[!@/#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z].*[a-z].*[a-z]).{8,}$/, // At least one uppercase, one lowercase, one number, and one special character.
    normal: /^(?=.*[A-Z]|(?=.*[!@#$&*/])|(?=.*[0-9])).{8,}$/, // At least one uppercase, one lowercase, and one number.
  };

  valid: boolean = true;

  constructor() {
    this.populateAgeOptions();
    this.populatePoidsActuelOptions();
    this.populateTailleOptions();
  }

  goNext(): void {
    this.currentStep++;
    console.log(this.currentStep);
  }
  goPrevious(): void {
    this.currentStep--;
    console.log(this.currentStep);
  }

  // __________ STEP 1 : ACCOUNT TYPE ___________

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

  //__________ STEP 2 : EMAIL & PASSWORD ___________

  email: string = '';

  password: string = '';

  confirmPassword: string = '';

  setEmail(event: string) {
    console.log('password set');

    this.email = event;
  }
  setPassword(event: string) {
    console.log('password set');

    this.password = event;
  }
  setConfirmPassword(event: string) {
    console.log('confirm password set');

    this.confirmPassword = event;
    this.checkPasswordValidation();
  }

  checkPasswordValidation() {
    this.valid = this.password == this.confirmPassword;
    console.log('valid from signup: ' + this.valid);
  }

  updatePasswordInputNote = (password: string, errors: any): string => {
    if (errors) {
      if (errors['required']) {
        return 'Required Field..';
      } else if (errors['minlength']) {
        return `Minimum length is ${errors['minlength'].requiredLength}..`;
      } else {
        return 'Invalid input..';
      }
    } else {
      if (this.strengthLevels['strong'].test(password)) {
        return 'Strong..'; // Valid password (strong).
      } else if (this.strengthLevels['normal'].test(password)) {
        return 'Normal..';
      } // Normal password strength.
      else {
        return 'Weak'; // Weak password strength.
      }
    }
  };

  updateConfirmPasswordInputNote = (newValue: string, errors: any): string => {
    if (!errors && this.valid) return '';
    if (!this.valid) {
      return 'Password Mismatch..';
    }
    return '';
  };

  updateEmailInputNote(newValue: string, errors: any): string {
    if (errors) {
      if (errors['required']) {
        return 'Required Field..';
      } else if (errors['email']) {
        return 'Invalid email..';
      } else {
        return 'Invalid input..';
      }
    } else {
      return '';
    }
  }

  // __________ STEP 3 : NAME / GENDER / AGE / PHONENUMBER ___________
  name: string = '';

  setName(name: string) {
    this.name = name;
  }

  genderOptions = ['Homme', 'Femme'];
  selectedGender: string = '';
  selectGender(gender: string) {
    this.selectedGender = gender;
    console.log('new gender selected' + this.selectedGender);
  }
  ageOptions: number[] = [];
  selectedAge: string = '';
  selectAge(age: string) {
    this.selectedAge = age;
  }

  populateAgeOptions(): void {
    const minAge = 18; // Minimum age
    const maxAge = 80; // Maximum age

    for (let age = minAge; age <= maxAge; age++) {
      this.ageOptions.push(age);
    }
  }

  phoneNumber: string = '';

  setPhoneNumber(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }

  // __________ STEP 4 : POIDS / TAILLE / ACTIVITE / OBJECTIF ___________

  poidsActuelOptions: string[] = [];
  populatePoidsActuelOptions(): void {
    const poidsMin = 40; // Minimum age
    const poidsMax = 250; // Maximum age

    for (let poids = poidsMin; poids <= poidsMax; poids++) {
      this.poidsActuelOptions.push(poids + ' Kg');
    }
  }
  selectedPoids: string = '';
  selectPoids(poids: string) {
    this.selectedPoids = poids;
  }
  tailleOptions: number[] = [];
  populateTailleOptions(): void {
    const tailleMin = 150; // Minimum age
    const tailleMax = 230; // Maximum age

    for (let taille = tailleMin; taille <= tailleMax; taille++) {
      this.tailleOptions.push(taille);
    }
  }
  selectedTaille: string = '';
  selectTaille(taille: string) {
    this.selectedTaille = taille;
  }

  activiteJournaliereOptions = [
    'Sédentaire',
    'Légèrement actif',
    'Modérément actif',
    'Très actif',
    'Extrêmement actif',
  ];
  selectedActiviteJournaliere: string = '';
  selectActiviteJournaliere(activiteJournaliere: string) {
    this.selectedActiviteJournaliere = activiteJournaliere;
  }
  objectifOptions = [
    'Perdre du poids',
    'Prendre du poids',
    'Se muscler',
    'Maintenir le poids',
  ];
  selectedObjectif: string = '';
  selectObjectif(objectif: string) {
    this.selectedObjectif = objectif;
  }
  //__________ STEP 5 : PHOTO  ___________
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  triggerFileInput() {
    console.log('clicked');

    console.log('fileInput: ' + this.fileInput);

    if (this.fileInput && this.fileInput.nativeElement) {
      console.log('found fileInput');

      this.fileInput.nativeElement.click();
    }
  }

  uploadedImage: string | null = null;
  // Handle file selection
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.uploadedImage = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
