import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { LoggerService } from 'src/app/services/logger.service';

@Directive({
  selector: '[appPasswordCheck]',
})
export class PasswordCheckDirective {
  @Input('applyPasswordCheck') applyPasswordCheck: boolean = false; // Reference to the NgModel or FormControl

  private noteElement: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Create a note element
  }
  logger = inject(LoggerService);
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['applyPasswordCheck']) {
      if (this.applyPasswordCheck) {
        this.noteElement = this.renderer.createElement('small');
        this.logger.info('created small tag');

        this.renderer.addClass(this.noteElement, 'input-note');
        const inputHeader = this.el.nativeElement
          .closest('.input-field-container')
          ?.querySelector('.input-header');
        if (inputHeader) {
          // Append the note element to the input-header container
          this.renderer.appendChild(inputHeader, this.noteElement);
        }
      }
    }
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    if (this.noteElement && this.applyPasswordCheck) {
      this.checkPasswordStrength(value);
    }
  }

  // updatePasswordInputNote = (password: string): string => {
  //   let errors = this.passwordControl.control.errors;
  //   if (errors) {
  //     if (errors['required']) {
  //       return 'Required Field..';
  //     } else if (errors['minlength']) {
  //       return Minimum length is ${errors['minlength'].requiredLength}..;
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
  strengthLevels: { [key: string]: RegExp } = {
    strong:
      /^(?=.*[A-Z])(?=.*[!@/#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z].*[a-z].*[a-z]).{8,}$/, // At least one uppercase, one lowercase, one number, and one special character.
    normal: /^(?=.*[A-Z]|(?=.*[!@#$&*/])|(?=.*[0-9])).{8,}$/, // At least one uppercase, one lowercase, and one number.
  };
  private checkPasswordStrength(password: string) {
    if (!password) {
      this.renderer.setProperty(
        this.noteElement,
        'textContent',
        'Required Field..'
      );
      this.renderer.removeClass(this.noteElement, 'valid-input-note');
      this.renderer.addClass(this.noteElement, 'error-input-note');
      return;
    }

    if (password.length < 8) {
      this.logger.debug('password length is less than 8', password.length);
      this.renderer.setProperty(
        this.noteElement,
        'textContent',
        'Minimum length is 8..'
      );
      this.renderer.removeClass(this.noteElement, 'valid-input-note');
      this.renderer.addClass(this.noteElement, 'error-input-note');
      return;
    }
    if (this.strengthLevels['strong'].test(password)) {
      this.renderer.setProperty(this.noteElement, 'textContent', 'Strong..');
    } else if (this.strengthLevels['normal'].test(password)) {
      this.renderer.setProperty(this.noteElement, 'textContent', 'Normal..');
    } else {
      this.renderer.setProperty(this.noteElement, 'textContent', 'Weak..');

      this.logger.info('valid input note');
    }
    this.renderer.removeClass(this.noteElement, 'error-input-note');
    this.renderer.addClass(this.noteElement, 'valid-input-note');
  }
}
