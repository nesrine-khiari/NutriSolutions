import { Component, inject } from '@angular/core';
// import { generateFakeClient } from 'src/app/core/helpers/faker.helper';
import { ClientModel } from 'src/app/models/client.model';
import { ObjectifEnum } from 'src/app/models/recipe.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-home-nutritioniste',
  templateUrl: './home-nutritioniste.component.html',
  styleUrls: ['./home-nutritioniste.component.css'],
})
export class HomeNutritionisteComponent {
  name = 'Kim';
  patientsList: ClientModel[] = [];
  objectif: ObjectifEnum = ObjectifEnum.MUSCLER;
  clientService = inject(ClientService);
  ngOnInit() {
    this.clientService.getAllclients().subscribe((clients: ClientModel[]) => {
      this.patientsList = clients;
    });
  }
}
