import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-auth-input-field',
  templateUrl: './auth-input-field.component.html',
  styleUrls: [
    './auth-input-field.component.css',
    '../../../../assets/css/auth-common.css',
  ],
})
export class AuthInputFieldComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() isPassword: boolean = false;
  @Input() required: boolean = false;
  @Input() inputValue: string = '';

  @Input() valid: boolean = true;

  @Input() updateInputNote: (newValue: string, errors: any) => string = (
    newValue: string,
    errors: any
  ) => {
    if (errors) {
      if (errors['required']) {
        return 'Required Field..';
      } else {
        return 'Invalid input..';
      }
    } else {
      return '';
    }
  };

  @Output() onInputChange = new EventEmitter<string>();

  inputNote: string = '';

  updateValue(newValue: string, errors: any | null) {
    this.onInputChange.emit(newValue);
    console.log('errors: ' + errors);

    this.inputNote = this.updateInputNote(newValue, errors);
  }

  isPasswordVisible: boolean = false;

  // Toggle password visibility
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
