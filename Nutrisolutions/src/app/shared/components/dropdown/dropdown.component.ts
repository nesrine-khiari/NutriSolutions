import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent {
  @Input() name: string = 'Objectif';
  @Input({ required: true }) options: any[] = ['Options1', 'Option2'];
  @Input() formControlName: FormControl = new FormControl('');
}
