import { Component, Input } from '@angular/core';
// import { generateFakeClient } from 'src/app/core/helpers/faker.helper';
import { AppUtils } from 'src/app/core/utils/functions.utils';
import { ClientModel } from 'src/app/models/client.model';

@Component({
  selector: 'app-upcoming-patient',
  templateUrl: './upcoming-patient.component.html',
  styleUrls: ['./upcoming-patient.component.css'],
})
export class UpcomingPatientComponent {
  @Input() isFirst: boolean = false;
  @Input({ required: true }) patient!: ClientModel;
  @Input() index: number = 0;

  styleObject: { backgroundColor: string; borderColor: string } = {
    backgroundColor: AppUtils.getCssVariable('--light-green'),
    borderColor: AppUtils.getCssVariable('--secondary-color'),
  };

  ngOnInit() {
    this.styleObject = this.getColor();
  }

  getInitals(fullName: string) {
    return AppUtils.getInitials(fullName);
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
