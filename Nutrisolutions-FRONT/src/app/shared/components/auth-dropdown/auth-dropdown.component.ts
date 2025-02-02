import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-auth-dropdown',
  templateUrl: './auth-dropdown.component.html',
  styleUrls: ['./auth-dropdown.component.css'],
})
export class AuthDropdownComponent {
  @Input({ required: true }) label: string = 'test';
  @Input({ required: true }) options: any[] = ['Options1', 'Option2'];
  @Input() control: FormControl = new FormControl('');

  @Input() selectedOption: string = '';
  @Output() onInputChange = new EventEmitter<string>();

  ngOnInit() {
    if (!this.selectedOption) this.selectedOption = this.options[0];
  }
  notifyParent(newValue: string) {
    this.onInputChange.emit(newValue);
    console.log('emitted new value : ' + newValue);
  }
}
