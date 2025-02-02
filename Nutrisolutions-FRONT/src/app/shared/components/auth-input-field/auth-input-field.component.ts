import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';
import { LoggerService } from 'src/app/services/logger.service';

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
  @Input() password?: string;
  @Input() control: FormControl = new FormControl('');
  @Input() applyCheck: boolean = false;
  logger = inject(LoggerService);
  @Output() onInputChange = new EventEmitter<string>();

  inputNote: string = '';

  updateValue(newValue: string, errors: any | null) {
    this.onInputChange.emit(newValue);
    this.logger.error('errors: ' + errors);
  }

  isPasswordVisible: boolean = false;

  // Toggle password visibility
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
