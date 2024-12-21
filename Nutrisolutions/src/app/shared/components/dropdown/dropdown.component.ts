import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent {
  @Input() name: string = 'Objectif';
  @Input({ required: true }) options: any[] = ['Options1', 'Option2'];
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
