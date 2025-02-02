import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[appConfirmPasswordCheck]',
})
export class ConfirmPasswordCheckDirective {
  @Input('applyConfirmPassword') applyConfirmPassword: boolean = false;
  @Input('password') password: any;

  private noteElement: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['applyConfirmPassword']) {
      if (this.applyConfirmPassword) {
        console.log('applying confirm pass');

        this.noteElement = this.renderer.createElement('small');
        console.log('created small tag');

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
    if (this.applyConfirmPassword) this.checkPasswordMatch(value);
  }

  private checkPasswordMatch(confirmPassword: string) {
    console.log('confirm pass :' + confirmPassword);
    console.log('pass :' + this.password);

    if (!confirmPassword) {
      this.renderer.setProperty(
        this.noteElement,
        'textContent',
        'Required Field..'
      );
      this.renderer.removeClass(this.noteElement, 'valid-input-note');
      this.renderer.addClass(this.noteElement, 'error-input-note');
      return;
    }

    if (confirmPassword != this.password) {
      this.renderer.setProperty(
        this.noteElement,
        'textContent',
        'Password Mismatch'
      );
      this.renderer.removeClass(this.noteElement, 'valid-input-note');
      this.renderer.addClass(this.noteElement, 'error-input-note');
    } else {
      this.renderer.setProperty(this.noteElement, 'textContent', '');
      this.renderer.removeClass(this.noteElement, 'valid-input-note');
      this.renderer.removeClass(this.noteElement, 'error-input-note');
    }
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+(\.[a-zA-Z]{1,})?$/;
    return emailRegex.test(email);
  }
}
