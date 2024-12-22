import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
})
export class InputFieldComponent implements OnInit {
  @Input() formControlName: FormControl = new FormControl('');
  @Input() placeholder: string = 'Type your Recipe title here';
  @Input() placeholderColor: string = 'var(--primary-color)';
  @Input() fontSize: string = 'clamp(9px, 14px, 1.4vw)';
  @Input() color: string = 'var(--primary-color)';
  @Input() fontWeight: string = '';

  @Output() enterPressed = new EventEmitter<string>();

  ngOnInit(): void {
    console.log('InputFieldComponent initialized');
    console.log('Placeholder:', this.placeholder);
    console.log('Font Size:', this.fontSize);
  }

  getStyles() {
    return {
      placeholder: this.placeholder,
      fontSize: this.fontSize,
      fontWeight: this.fontWeight,
      color: this.color,
    };
  }

  onEnter(): void {
    this.enterPressed.emit(this.formControlName.value);
    this.formControlName.reset();
  }
}
