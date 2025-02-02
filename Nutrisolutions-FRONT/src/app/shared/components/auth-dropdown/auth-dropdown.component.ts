import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoggerService } from 'src/app/services/logger.service';

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
  logger = inject(LoggerService);
  ngOnInit() {
    if (!this.selectedOption) this.selectedOption = this.options[0];
  }
  notifyParent(newValue: string) {
    this.onInputChange.emit(newValue);
    this.logger.debug('emitted new value : ' + newValue);
  }
}
