import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ClientModel } from 'src/app/models/client.model';
import { ObjectifEnum } from 'src/app/models/recipe.model';
import { SlotModel } from 'src/app/models/slot.model';
import { ClientService } from 'src/app/services/client.service';
import { LoggerService } from 'src/app/services/logger.service';

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
  @Input() nutritionistId: string = '';
  objectifImg: string = 'se-muscler';
  clientService = inject(ClientService);
  appointment!: SlotModel;
  selectedPatient: ClientModel | null = null;
  appointmentsLength: number = 0;
  logger = inject(LoggerService);
  isLoading: boolean = false;
  selectPatient(patient: ClientModel) {
    this.selectedPatient = patient;
    this.isLoading = true;

    this.clientService
      .getAppointment(
        this.selectedPatient?.id ?? '',
        this.nutritionistId,
        this.selectedPatient.reservedSlotsCount
      )
      .subscribe({
        next: (appointment) => {
          this.appointment = appointment;
          this.logger.debug('get appointment' + appointment);

          this.isLoading = false;
        },
        error: (err) => {
          this.logger.error('error', err);
        },
      });
  }
  ngOnInit() {
    this.selectedPatient = this.patients.length ? this.patients[0] : null;
    // this.appointmentsLength = this.selectedPatient.reservedSlots.length;
    this.logger.debug('selectedPatient' + this.selectedPatient);
    if (this.selectedPatient) {
      this.isLoading = true;
      this.clientService
        .getAppointment(
          this.selectedPatient?.id ?? '',
          this.nutritionistId,
          this.selectedPatient.reservedSlotsCount
        )
        .subscribe({
          next: (appointment) => {
            this.appointment = appointment;
            this.logger.debug('get appointment' + appointment);
            this.isLoading = false;
          },
          error: (err) => {
            this.logger.error('error', err);
          },
        });
    }
  }

  onAppointementNumberChanged(appointementNumber: number) {
    this.clientService
      .getAppointment(
        this.selectedPatient?.id ?? '',
        this.nutritionistId,
        appointementNumber
      )
      .subscribe({
        next: (appointment) => {
          this.appointment = appointment;
          this.logger.debug(
            'New Appointement Set: ' +
              JSON.stringify(this.appointment) +
              'After changing number to : ' +
              appointementNumber
          );
        },
      });
  }

  getAppointement(selectedPatientId: string) {}
}
