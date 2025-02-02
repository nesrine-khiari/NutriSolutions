import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
})
export class InputFieldComponent implements OnInit {
  @Input() control: FormControl = new FormControl('');
  @Input() placeholder: string = 'Type your Recipe title here';
  @Input() placeholderColor: string = 'var(--primary-color)';
  @Input() fontSize: string = 'clamp(9px, 14px, 1.4vw)';
  @Input() color: string = 'var(--primary-color)';
  @Input() fontWeight: string = '';
  logger = inject(LoggerService);
  @Output() enterPressed = new EventEmitter<string>();

  ngOnInit(): void {
    this.logger.info('InputFieldComponent initialized');
    this.logger.debug('Placeholder:', this.placeholder);
    this.logger.debug('Font Size:', this.fontSize);
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
    this.enterPressed.emit(this.control.value);
    this.control.reset();
  }
}
