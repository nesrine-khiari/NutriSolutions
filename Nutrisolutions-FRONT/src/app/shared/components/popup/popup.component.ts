import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent {
  @Input() text: string = '';
  @Input() isPopupVisible: boolean = false;
  // @Input() onConfirmClicked: () => void = () => {};
  // @Input() onCancelClicked: () => void = () => {};
  @Output() popupClosed = new EventEmitter<boolean>();
  clsoePopup() {
    this.isPopupVisible = false;
    this.popupClosed.emit(false);
  }
}
