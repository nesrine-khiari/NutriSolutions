import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClientModel } from 'src/app/models/client.model';
import { ObjectifEnum } from 'src/app/models/recipe.model';
import { SlotModel } from 'src/app/models/slot.model';
import { ClientService } from 'src/app/services/client.service';
import { PlanningService } from 'src/app/services/planning.service';

@Component({
  selector: 'app-appointment-card',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.css'],
})
export class AppointmentCardComponent {
  isPopupVisible: boolean = false; // Initially hidden
  newNoteControl: FormControl = new FormControl('');
  @Input({ required: true }) appointement!: SlotModel;
  @Input({ required: true }) appointmentsCount!: number;
  apppointementIndex: number = 0;
  clientService = inject(ClientService);
  slotService = inject(PlanningService);
  @Output() onAppointmentChanged = new EventEmitter();
  toastr = inject(ToastrService);
  objectifImg: string = 'perdre-du-poids';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['appointmentsCount']) {
      // Logic triggered only when appointmentsCount changes
      this.apppointementIndex = this.appointmentsCount;
    }
  }

  ngOnInit() {
    this.apppointementIndex = this.appointmentsCount;
    console.log(this.appointement);
  }
  // Method to show the popup
  getObjectifImg(objectif: ObjectifEnum) {
    switch (objectif) {
      case ObjectifEnum.PERDRE_POIDS:
        return (this.objectifImg = 'perdre-du-poids');
      case ObjectifEnum.PRENDRE_POIDS:
        return (this.objectifImg = 'prendre-du-poids');

      default:
        return (this.objectifImg = 'se-muscler');
    }
  }
  getNextAppointment() {
    if (this.apppointementIndex < this.appointmentsCount) {
      this.apppointementIndex++;
      this.onAppointmentChanged.emit(this.apppointementIndex);
    }
  }
  getPreviousAppointment() {
    if (this.apppointementIndex > 1) {
      this.apppointementIndex--;
      this.onAppointmentChanged.emit(this.apppointementIndex);
    }
  }

  showPopup = () => {
    this.isPopupVisible = true;
    console.log('pop shown');
  };

  // Method to hide the popup

  closePopup() {
    this.isPopupVisible = false;
  }
  addNote(newNote: string) {
    this.slotService
      .addNote(this.appointement.id!, [
        ...(this.appointement?.notes ?? []),
        newNote,
      ])
      .subscribe({
        next: (reservedSlot) => {
          this.appointement = reservedSlot;
          this.toastr.success('Note Added Successfully!');
        },
        error: (err) => {
          this.toastr.error('Error');
        },
      });
  }
}
