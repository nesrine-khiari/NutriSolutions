import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { GetAgePipe } from 'src/app/core/pipes/get-age.pipe';
// import { generateFakeClient } from 'src/app/core/helpers/faker.helper';
import { AppUtils } from 'src/app/core/utils/functions.utils';
import { ClientModel } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-upcoming-patient',
  templateUrl: './upcoming-patient.component.html',
  styleUrls: ['./upcoming-patient.component.css'],
})
export class UpcomingPatientComponent {
  @Input() isSelected: boolean = false;
  @Input({ required: true }) patient!: ClientModel;
  @Input() index: number = 0;
  @Input() appointmentTime: string | null = null;
  styleObject: { backgroundColor: string; borderColor: string } = {
    backgroundColor: AppUtils.getCssVariable('--light-green'),
    borderColor: AppUtils.getCssVariable('--secondary-color'),
  };
  clientService = inject(ClientService);
  @Output() onSelectPatient = new EventEmitter<ClientModel>();
  ngOnInit() {
    this.styleObject = this.getColor();
  }

  selectPatient(patient: ClientModel) {
    this.onSelectPatient.emit(patient);
  }

  getColor() {
    const colors = [
      {
        backgroundColor: AppUtils.getCssVariable('--light-green'),
        borderColor: AppUtils.getCssVariable('--secondary-color'),
      },
      { backgroundColor: '#FBD5DC', borderColor: '#F875B0' },
      { backgroundColor: '#BCB8F0', borderColor: '#6462F7' },
    ];
    return colors[this.index % 3];
  }
}
