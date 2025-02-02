// import { Component, ElementRef, inject, ViewChild } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
// import { AppUtils } from 'src/app/core/utils/functions.utils';
// import {
//   ActivityLevelEnum,
//   ClientModel,
//   GenderEnum,
//   UserRoleEnum,
// } from 'src/app/models/client.model';
// import {
//   NutritionistModel,
//   StatusEnum,
// } from 'src/app/models/nutritionist.model';
// import { ObjectifEnum, RecipeModel } from 'src/app/models/recipe.model';
// import { UserModel } from 'src/app/models/user.model';
// import { AuthService } from 'src/app/services/auth.service';
// import { ClientService } from 'src/app/services/client.service';
// import { FileUploadService } from 'src/app/services/file-upload.service';
// import { NutritionistsService } from 'src/app/services/nutritionists.service';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['../../../assets/css/auth-common.css', './signup.component.css'],
// })
// export class SignupComponent {
//   currentStep: number = 0;
//   stepLabels: string[] = [
//     'Account Type',
//     'Account Information',
//     'Profile Data',
//     'Additionnal Information',
//     'Profile Pictrue',
//   ];
//   strengthLevels: { [key: string]: RegExp } = {
//     strong:
//       /^(?=.*[A-Z])(?=.*[!@/#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z].*[a-z].*[a-z]).{8,}$/, // At least one uppercase, one lowercase, one number, and one special character.
//     normal: /^(?=.*[A-Z]|(?=.*[!@#$&*/])|(?=.*[0-9])).{8,}$/, // At least one uppercase, one lowercase, and one number.
//   };

//   valid: boolean = true;

//   constructor() {
//     // this.populateAgeOptions();
//     this.populatePoidsActuelOptions();
//     this.populateTailleOptions();
//     this.populateExpYearsOptions();
//   }

//   goNext(): void {
//     this.currentStep++;
//     console.log(this.currentStep);
//   }
//   goPrevious(): void {
//     this.currentStep--;
//     console.log(this.currentStep);
//   }

//   // __________ STEP 1 : ACCOUNT TYPE ___________
//   clientRole: UserRoleEnum = UserRoleEnum.CLIENT;
//   nutritionnistRole: UserRoleEnum = UserRoleEnum.NUTRITIONIST;
//   accountTypes = [
//     {
//       type: UserRoleEnum.NUTRITIONIST,
//       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
//     },
//     {
//       type: UserRoleEnum.CLIENT,
//       description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
//     },
//   ];

//   selectedType: string = '';

//   selectType(type: string) {
//     this.selectedType = type;
//   }

//   //__________ STEP 2 : EMAIL & PASSWORD ___________

//   email: string = '';

//   password: string = '';

//   confirmPassword: string = '';

//   setEmail(event: string) {
//     console.log('password set');

//     this.email = event;
//   }
//   setPassword(event: string) {
//     console.log('password set');

//     this.password = event;
//   }
//   setConfirmPassword(event: string) {
//     console.log('confirm password set');

//     this.confirmPassword = event;
//     this.checkPasswordValidation();
//   }

//   checkPasswordValidation() {
//     this.valid = this.password == this.confirmPassword;
//     console.log('valid from signup: ' + this.valid);
//   }

//   updatePasswordInputNote = (password: string, errors: any): string => {
//     if (errors) {
//       if (errors['required']) {
//         return 'Required Field..';
//       } else if (errors['minlength']) {
//         return `Minimum length is ${errors['minlength'].requiredLength}..`;
//       } else {
//         return 'Invalid input..';
//       }
//     } else {
//       if (this.strengthLevels['strong'].test(password)) {
//         return 'Strong..'; // Valid password (strong).
//       } else if (this.strengthLevels['normal'].test(password)) {
//         return 'Normal..';
//       } // Normal password strength.
//       else {
//         return 'Weak'; // Weak password strength.
//       }
//     }
//   };

//   updateConfirmPasswordInputNote = (newValue: string, errors: any): string => {
//     if (!errors && this.valid) return '';
//     if (!this.valid) {
//       return 'Password Mismatch..';
//     }
//     return '';
//   };

//   updateEmailInputNote(newValue: string, errors: any): string {
//     if (errors) {
//       if (errors['required']) {
//         return 'Required Field..';
//       } else if (errors['email']) {
//         return 'Invalid email..';
//       } else {
//         return 'Invalid input..';
//       }
//     } else {
//       return '';
//     }
//   }

//   // __________ STEP 3 : NAME / GENDER / AGE / PHONENUMBER ___________
//   name: string = '';

//   setName(name: string) {
//     this.name = name;
//   }

//   genderOptions = ['Homme', 'Femme'];
//   selectedGender: string = 'Homme';
//   selectGender(gender: string) {
//     this.selectedGender = gender;
//     console.log('new gender selected' + this.selectedGender);
//   }
//   // ageOptions: number[] = [];
//   // selectedAge: string = '';
//   selectedDateControl = new FormControl('');
//   // selectAge(age: string) {
//   //   this.selectedAge = age;
//   // }

//   // populateAgeOptions(): void {
//   //   const minAge = 18; // Minimum age
//   //   const maxAge = 80; // Maximum age

//   //   for (let age = minAge; age <= maxAge; age++) {
//   //     this.ageOptions.push(age);
//   //   }
//   // }

//   phoneNumber: string = '';

//   setPhoneNumber(phoneNumber: string) {
//     this.phoneNumber = phoneNumber;
//   }
//   // __________ STEP 4 : Nutritionist Details___________
//   experienceYearsOptions: number[] = [];
//   selectedExperienceYears: string = '1';
//   populateExpYearsOptions(): void {
//     const minExpYears = 1;
//     const maxExpYears = 50;

//     for (let expYears = minExpYears; expYears <= maxExpYears; expYears++) {
//       this.experienceYearsOptions.push(expYears);
//     }
//   }
//   selectExperienceYears($event: string) {
//     this.selectedExperienceYears = $event;
//   }
//   location: string = '';

//   setLocation(event: string) {
//     this.location = event;
//   }
//   // __________ STEP 4 : POIDS / TAILLE / ACTIVITE / OBJECTIF ___________

//   poidsActuelOptions: string[] = [];
//   populatePoidsActuelOptions(): void {
//     const poidsMin = 40; // Minimum age
//     const poidsMax = 250; // Maximum age

//     for (let poids = poidsMin; poids <= poidsMax; poids++) {
//       this.poidsActuelOptions.push(poids.toString());
//     }
//   }
//   selectedPoids: string = '40';
//   selectPoids(poids: string) {
//     this.selectedPoids = poids;
//   }
//   tailleOptions: number[] = [];
//   populateTailleOptions(): void {
//     const tailleMin = 150; // Minimum age
//     const tailleMax = 230; // Maximum age

//     for (let taille = tailleMin; taille <= tailleMax; taille++) {
//       this.tailleOptions.push(taille);
//     }
//   }
//   selectedTaille: string = '150';
//   selectTaille(taille: string) {
//     this.selectedTaille = taille;
//   }

//   activiteJournaliereOptions = [
//     'Sédentaire',
//     'Légèrement actif',
//     'Modérément actif',
//     'Très actif',
//     'Extrêmement actif',
//   ];
//   selectedActiviteJournaliere: string = this.activiteJournaliereOptions[0];
//   selectActiviteJournaliere(activiteJournaliere: string) {
//     this.selectedActiviteJournaliere = activiteJournaliere;
//   }
//   objectifOptions = [
//     'Perdre du poids',
//     'Prendre du poids',
//     'Se muscler',
//     'Maintenir le poids',
//   ];
//   selectedObjectif: string = this.objectifOptions[0];
//   selectObjectif(objectif: string) {
//     this.selectedObjectif = objectif;
//   }

//   // __________ STEP 5 : Image Upload ___________
//   imageFile?: File;
//   uploadedImage: string = '';
//   selectImage(selectedImage: File) {
//     this.imageFile = selectedImage;
//     const reader = new FileReader();
//     reader.onload = (e: ProgressEvent<FileReader>) => {
//       this.uploadedImage = e.target?.result as string;
//     };
//     reader.readAsDataURL(selectedImage);
//     console.log('Selected image:', selectedImage.name);
//   }
//   uploadedFile: string = '';
//   pdfFile?: File;
//   selectFile(selectedFile: File) {
//     this.pdfFile = selectedFile;
//     this.uploadedFile = selectedFile.name;
//   }

//   createUserModel(): UserModel {
//     let user: UserModel;
//     if (this.selectedType === UserRoleEnum.CLIENT) {
//       user = new ClientModel(
//         this.name,
//         this.email,
//         this.password,
//         this.phoneNumber,
//         this.uploadedImage,
//         AppUtils.convertToEnum(GenderEnum, this.selectedGender),
//         new Date(this.selectedDateControl.value ?? ''),
//         UserRoleEnum.CLIENT,
//         parseInt(this.selectedTaille),
//         parseInt(this.selectedPoids),
//         [],
//         AppUtils.convertToEnum(ObjectifEnum, this.selectedObjectif),
//         AppUtils.convertToEnum(
//           ActivityLevelEnum,
//           this.selectedActiviteJournaliere
//         )
//       );
//     } else {
//       user = new NutritionistModel(
//         this.name,
//         this.email,
//         this.password,
//         this.phoneNumber,
//         this.uploadedImage,
//         AppUtils.convertToEnum(GenderEnum, this.selectedGender),
//         new Date(this.selectedDateControl.value ?? ''),
//         UserRoleEnum.NUTRITIONIST,
//         parseInt(this.selectedExperienceYears),
//         this.uploadedFile,
//         StatusEnum.Waiting,
//         this.location
//       );
//     }

//     return user;
//   }
//   isFormInvalid: boolean = true;
//   isButtonDisabled() {
//     this.isFormInvalid =
//       !this.name ||
//       !this.email ||
//       !this.password ||
//       !this.confirmPassword ||
//       !this.selectedDateControl.value ||
//       !this.phoneNumber ||
//       !this.selectedType ||
//       !this.selectedPoids ||
//       !this.selectedTaille ||
//       !this.selectedActiviteJournaliere ||
//       !this.selectedObjectif ||
//       !this.selectedGender;
//     return this.isFormInvalid;
//   }
//   toastr = inject(ToastrService);
//   uploadFileService = inject(FileUploadService);
//   saveUser = () => {
//     if (this.imageFile) {
//       // Upload the image first
//       this.uploadFileService.uploadImage(this.imageFile).subscribe({
//         next: (response) => {
//           console.log('Upload Success:', response);
//           this.uploadedImage = response.path;
//           this.processSignup(); // Handle the recipe after uploading the image
//         },
//         error: (err) => {
//           console.error('Upload Failed:', err);
//           this.toastr.error('Image upload failed. Please try again.');
//         },
//       });
//     }
//   };

//   private processSignup = () => {
//     if (this.pdfFile) {
//       this.uploadFileService.uploadFile(this.pdfFile).subscribe({
//         next: (response) => {
//           console.log('Upload Success:', response);
//           this.uploadedFile = response.path;
//           this.finalizeSignup();
//         },
//         error: (err) => {
//           console.error('Upload Failed:', err);
//           this.toastr.error('File upload failed. Please try again.');
//         },
//       });
//     } else {
//       this.finalizeSignup();
//     }
//   };
//   authService = inject(AuthService);
//   finalizeSignup = () => {
//     const user = this.createUserModel();
//     console.log('====================================');
//     console.log('User:', user);
//     console.log('====================================');
//     this.authService.signupUser(user);
//   };
// }

import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppUtils } from 'src/app/core/utils/functions.utils';
import {
  ActivityLevelEnum,
  ClientModel,
  GenderEnum,
  UserRoleEnum,
} from 'src/app/models/client.model';
import {
  NutritionistModel,
  StatusEnum,
} from 'src/app/models/nutritionist.model';
import { ObjectifEnum, RecipeModel } from 'src/app/models/recipe.model';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { NutritionistsService } from 'src/app/services/nutritionists.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../../../assets/css/auth-common.css', './signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
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

  control = new FormControl('');

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      accountType: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      name: ['', Validators.required],
      gender: ['Homme', Validators.required],
      birthDate: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      poids: ['40', Validators.required],
      taille: ['150', Validators.required],
      activiteJournaliere: ['Sédentaire', Validators.required],
      objectif: ['Perdre du poids', Validators.required],
      experienceYears: ['1', Validators.required],
      location: ['', Validators.required],
      imageFile: [null],
      pdfFile: [null],
    });
    this.signupForm.valueChanges.subscribe((form) => console.log(form));

    this.signupForm
      .get('confirmPassword')
      ?.valueChanges.subscribe((value) => this.checkPasswordValidation(value));

    // this.populateAgeOptions();
    this.populatePoidsActuelOptions();
    this.populateTailleOptions();
    this.populateExpYearsOptions();
  }
  get accountTypeControl(): FormControl {
    return this.signupForm.get('accountType') as FormControl;
  }

  get emailControl(): FormControl {
    return this.signupForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.signupForm.get('password') as FormControl;
  }

  get confirmPasswordControl(): FormControl {
    return this.signupForm.get('confirmPassword') as FormControl;
  }

  get nameControl(): FormControl {
    return this.signupForm.get('name') as FormControl;
  }

  get genderControl(): FormControl {
    return this.signupForm.get('gender') as FormControl;
  }

  get birthDateControl(): FormControl {
    return this.signupForm.get('birthDate') as FormControl;
  }

  get phoneNumberControl(): FormControl {
    return this.signupForm.get('phoneNumber') as FormControl;
  }

  get poidsControl(): FormControl {
    return this.signupForm.get('poids') as FormControl;
  }

  get tailleControl(): FormControl {
    return this.signupForm.get('taille') as FormControl;
  }

  get activiteJournaliereControl(): FormControl {
    return this.signupForm.get('activiteJournaliere') as FormControl;
  }

  get objectifControl(): FormControl {
    return this.signupForm.get('objectif') as FormControl;
  }

  get experienceYearsControl(): FormControl {
    return this.signupForm.get('experienceYears') as FormControl;
  }

  get locationControl(): FormControl {
    return this.signupForm.get('location') as FormControl;
  }

  get imageFileControl(): FormControl {
    return this.signupForm.get('imageFile') as FormControl;
  }

  get pdfFileControl(): FormControl {
    return this.signupForm.get('pdfFile') as FormControl;
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
  clientRole: UserRoleEnum = UserRoleEnum.CLIENT;
  nutritionnistRole: UserRoleEnum = UserRoleEnum.NUTRITIONIST;
  accountTypes = [
    {
      type: UserRoleEnum.NUTRITIONIST,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      type: UserRoleEnum.CLIENT,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
  ];

  selectType(type: string) {
    this.signupForm.patchValue({ accountType: type });
  }

  //__________ STEP 2 : EMAIL & PASSWORD ___________

  // setEmail(event: string) {
  //   console.log('email set');
  //   this.signupForm.patchValue({ email: event });
  // }
  // setPassword(event: string) {
  //   console.log('password set');
  //   this.signupForm.patchValue({ password: event });
  // }
  // setConfirmPassword(event: string) {
  //   console.log('confirm password set');
  //   this.signupForm.patchValue({ confirmPassword: event });
  //   this.checkPasswordValidation();
  // }

  checkPasswordValidation(newConfirmPassword: string) {
    this.valid = this.signupForm.value.password === newConfirmPassword;
  }

  // updatePasswordInputNote = (password: string, errors: any): string => {
  //   if (errors) {
  //     if (errors['required']) {
  //       return 'Required Field..';
  //     } else if (errors['minlength']) {
  //       return `Minimum length is ${errors['minlength'].requiredLength}..`;
  //     } else {
  //       return 'Invalid input..';
  //     }
  //   } else {
  //     if (this.strengthLevels['strong'].test(password)) {
  //       return 'Strong..'; // Valid password (strong).
  //     } else if (this.strengthLevels['normal'].test(password)) {
  //       return 'Normal..';
  //     } // Normal password strength.
  //     else {
  //       return 'Weak'; // Weak password strength.
  //     }
  //   }
  // };

  // updateConfirmPasswordInputNote = (newValue: string, errors: any): string => {
  //   if (!errors && this.valid) return '';
  //   if (!this.valid) {
  //     return 'Password Mismatch..';
  //   }
  //   return '';
  // };

  // updateEmailInputNote(newValue: string, errors: any): string {
  //   if (errors) {
  //     if (errors['required']) {
  //       return 'Required Field..';
  //     } else if (errors['email']) {
  //       return 'Invalid email..';
  //     } else {
  //       return 'Invalid input..';
  //     }
  //   } else {
  //     return '';
  //   }
  // }

  // __________ STEP 3 : NAME / GENDER / AGE / PHONENUMBER ___________

  setName(name: string) {
    this.signupForm.patchValue({ name: name });
  }

  genderOptions = ['Homme', 'Femme'];
  selectGender(gender: string) {
    this.signupForm.patchValue({ gender: gender });
    console.log('new gender selected' + gender);
  }

  setPhoneNumber(phoneNumber: string) {
    this.signupForm.patchValue({ phoneNumber: phoneNumber });
  }

  // __________ STEP 4 : Nutritionist Details___________
  experienceYearsOptions: number[] = [];
  populateExpYearsOptions(): void {
    const minExpYears = 1;
    const maxExpYears = 50;

    for (let expYears = minExpYears; expYears <= maxExpYears; expYears++) {
      this.experienceYearsOptions.push(expYears);
    }
  }
  selectExperienceYears($event: string) {
    this.signupForm.patchValue({ experienceYears: $event });
  }
  setLocation(event: string) {
    this.signupForm.patchValue({ location: event });
  }

  // __________ STEP 4 : POIDS / TAILLE / ACTIVITE / OBJECTIF ___________

  poidsActuelOptions: string[] = [];
  populatePoidsActuelOptions(): void {
    const poidsMin = 40; // Minimum age
    const poidsMax = 250; // Maximum age

    for (let poids = poidsMin; poids <= poidsMax; poids++) {
      this.poidsActuelOptions.push(poids.toString());
    }
  }
  selectPoids(poids: string) {
    this.signupForm.patchValue({ poids: poids });
  }
  tailleOptions: number[] = [];
  populateTailleOptions(): void {
    const tailleMin = 150; // Minimum age
    const tailleMax = 230; // Maximum age

    for (let taille = tailleMin; taille <= tailleMax; taille++) {
      this.tailleOptions.push(taille);
    }
  }
  selectTaille(taille: string) {
    this.signupForm.patchValue({ taille: taille });
  }

  activiteJournaliereOptions = [
    'Sédentaire',
    'Légèrement actif',
    'Modérément actif',
    'Très actif',
    'Extrêmement actif',
  ];
  selectActiviteJournaliere(activiteJournaliere: string) {
    this.signupForm.patchValue({ activiteJournaliere: activiteJournaliere });
  }
  objectifOptions = [
    'Perdre du poids',
    'Prendre du poids',
    'Se muscler',
    'Maintenir le poids',
  ];
  selectObjectif(objectif: string) {
    this.signupForm.patchValue({ objectif: objectif });
  }

  // __________ STEP 5 : Image Upload ___________
  // imageFile?: File;
  uploadedImage: string = '';
  selectImage(selectedImage: File) {
    this.signupForm.patchValue({ imageFile: selectedImage });

    // this.imageFile = selectedImage;
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.uploadedImage = e.target?.result as string;
    };
    reader.readAsDataURL(selectedImage);
    console.log('Selected image:', selectedImage.name);
  }
  uploadedFile: string = '';
  pdfFile?: File;
  selectFile(selectedFile: File) {
    this.signupForm.patchValue({ pdfFile: selectedFile });

    this.pdfFile = selectedFile;
    this.uploadedFile = selectedFile.name;
  }

  createUserModel(): UserModel {
    const formValues = this.signupForm.value;
    let user: UserModel;
    if (formValues.accountType === UserRoleEnum.CLIENT) {
      user = new ClientModel(
        formValues.name,
        formValues.email,
        formValues.password,
        formValues.phoneNumber,
        this.uploadedImage,
        AppUtils.convertToEnum(GenderEnum, formValues.gender),
        new Date(formValues.birthDate),
        UserRoleEnum.CLIENT,
        parseInt(formValues.taille),
        parseInt(formValues.poids),
        [],
        AppUtils.convertToEnum(ObjectifEnum, formValues.objectif),
        AppUtils.convertToEnum(
          ActivityLevelEnum,
          formValues.activiteJournaliere
        )
      );
    } else {
      user = new NutritionistModel(
        formValues.name,
        formValues.email,
        formValues.password,
        formValues.phoneNumber,
        this.uploadedImage,
        AppUtils.convertToEnum(GenderEnum, formValues.gender),
        new Date(formValues.birthDate),
        UserRoleEnum.NUTRITIONIST,
        parseInt(formValues.experienceYears),
        formValues.uploadedFile,
        StatusEnum.Waiting,
        formValues.location
      );
    }

    return user;
  }
  isFormInvalid: boolean = true;
  isButtonDisabled() {
    this.isFormInvalid = this.signupForm.invalid;
    return this.isFormInvalid;
  }
  toastr = inject(ToastrService);
  uploadFileService = inject(FileUploadService);
  saveUser = () => {
    if (this.imageFileControl.value) {
      // Upload the image first
      this.uploadFileService
        .uploadImage(this.imageFileControl.value)
        .subscribe({
          next: (response) => {
            console.log('Upload Success:', response);
            this.uploadedImage = response.path;
            this.processSignup(); // Handle the recipe after uploading the image
          },
          error: (err) => {
            console.error('Upload Failed:', err);
            this.toastr.error('Image upload failed. Please try again.');
          },
        });
    }
  };

  private processSignup = () => {
    if (this.pdfFileControl.value) {
      this.uploadFileService.uploadFile(this.pdfFileControl.value).subscribe({
        next: (response) => {
          console.log('Upload Success:', response);
          this.uploadedFile = response.path;
          this.finalizeSignup();
        },
        error: (err) => {
          console.error('Upload Failed:', err);
          this.toastr.error('File upload failed. Please try again.');
        },
      });
    } else {
      this.finalizeSignup();
    }
  };
  authService = inject(AuthService);
  finalizeSignup = () => {
    const user = this.createUserModel();
    console.log('====================================');
    console.log('User:', user);
    console.log('====================================');
    this.authService.signupUser(user);
  };
}
