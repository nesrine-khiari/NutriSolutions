import { Component } from '@angular/core';
import { generateFakeClient } from 'src/app/core/helpers/faker.helper';
import { ClientModel } from 'src/app/models/client.model';
import { ObjectifEnum } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-home-nutritioniste',
  templateUrl: './home-nutritioniste.component.html',
  styleUrls: ['./home-nutritioniste.component.css'],
})
export class HomeNutritionisteComponent {
  name = 'Kim';
  patientsList: ClientModel[] = [];
  objectif: ObjectifEnum = ObjectifEnum.MUSCLER;

  ngOnInit() {
    this.patientsList = Array.from({ length: 8 }, () => generateFakeClient());
  }
}
