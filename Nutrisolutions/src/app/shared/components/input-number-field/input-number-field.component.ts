import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-number-field',
  templateUrl: './input-number-field.component.html',
  styleUrls: ['./input-number-field.component.css'],
})
export class InputNumberFieldComponent {
  @Input({ required: true }) label: string = 'test';
}
