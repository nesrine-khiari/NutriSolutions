import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent {
  @Input() text: string = '';

  @Output() popupClosed = new EventEmitter<boolean>();
  clsoePopup() {
    this.popupClosed.emit(false);
  }
}
