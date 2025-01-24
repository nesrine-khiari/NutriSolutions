import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ClientModel } from 'src/app/models/client.model';
import { ObjectifEnum } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-upcoming-patients',
  templateUrl: './upcoming-patients.component.html',
  styleUrls: [
    '../../../../../assets/css/popup.css',
    './upcoming-patients.component.css',
  ],
})
export class UpcomingPatientsComponent {
  @Input() patients: ClientModel[] = [];
  notes: string[] = ['High fever and cough and and adn '];
  isPopupVisible: boolean = false; // Initially hidden

  newNoteControl: FormControl = new FormControl('');
  objectifImg: string = 'se-muscler';
  ngOnInit() {
    switch (this.patients[0].objectif) {
      case ObjectifEnum.PERDRE_POIDS:
        this.objectifImg = 'perdre-du-poids';
        break;
      case ObjectifEnum.PRENDRE_POIDS:
        this.objectifImg = 'prendre-du-poids';
        break;

      default:
        break;
    }
  }

  // Method to show the popup
  showPopup = () => {
    this.isPopupVisible = true;
    console.log('pop shown');
  };

  // Method to hide the popup

  closePopup() {
    this.isPopupVisible = false;
  }
  addNote(newNote: string) {
    this.notes.push(newNote);
  }
}
