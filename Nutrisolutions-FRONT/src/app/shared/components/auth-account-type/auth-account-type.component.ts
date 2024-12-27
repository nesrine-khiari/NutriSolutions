import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-auth-account-type',
  templateUrl: './auth-account-type.component.html',
  styleUrls: ['./auth-account-type.component.css'],
})
export class AuthAccountTypeComponent {
  @Input() type: string = '';
  @Input() description: string = '';
  @Input() selectedType: string = '';

  // Default values for iconType1 and iconType2
  iconType1: string = 'assets/images/type1.png';
  iconType2: string = 'assets/images/type2.png';

  @Output() typeSelected = new EventEmitter<string>();

  selectType() {
    this.typeSelected.emit(this.type);
  }
}
