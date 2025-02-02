import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appEmailCheck]',
})
export class EmailCheckDirective {
  @Input('applyEmailCheck') applyEmailCheck: boolean = false; // Reference to the NgModel or FormControl

  private noteElement: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Create a note element
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['applyEmailCheck']) {
      if (this.applyEmailCheck) {
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
    this.checkEmailValidity(value);
  }

  private checkEmailValidity(email: string) {
    if (!email) {
      this.renderer.setProperty(
        this.noteElement,
        'textContent',
        'Required Field..'
      );
      this.renderer.removeClass(this.noteElement, 'valid-input-note');
      this.renderer.addClass(this.noteElement, 'error-input-note');
      return;
    }

    const isValid = this.validateEmail(email);
    if (isValid) {
      this.renderer.setProperty(this.noteElement, 'textContent', 'Valid email');
      this.renderer.removeClass(this.noteElement, 'error-input-note');
      this.renderer.addClass(this.noteElement, 'valid-input-note');
    } else {
      this.renderer.setProperty(
        this.noteElement,
        'textContent',
        'Invalid email'
      );
      this.renderer.removeClass(this.noteElement, 'valid-input-note');
      this.renderer.addClass(this.noteElement, 'error-input-note');
    }
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+(\.[a-zA-Z]{1,})?$/;
    return emailRegex.test(email);
  }
}
