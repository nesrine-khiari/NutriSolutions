import { Component, inject } from '@angular/core';
// import { generateFakeClient } from 'src/app/core/helpers/faker.helper';
import { ClientModel } from 'src/app/models/client.model';
import { NutritionistModel } from 'src/app/models/nutritionist.model';
import { ObjectifEnum } from 'src/app/models/recipe.model';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { NutritionistsService } from 'src/app/services/nutritionists.service';

@Component({
  selector: 'app-home-nutritioniste',
  templateUrl: './home-nutritioniste.component.html',
  styleUrls: ['./home-nutritioniste.component.css'],
})
export class HomeNutritionisteComponent {
  nutritionist: NutritionistModel | null = null;
  patientsList: ClientModel[] = [];
  objectif: ObjectifEnum = ObjectifEnum.MUSCLER;
  clientService = inject(ClientService);
  nutritionistService = inject(NutritionistsService);
  authService = inject(AuthService);
  constructor() {
    this.nutritionistService
      .getNutritionistById(this.authService.getUserId())
      .subscribe({
        next: (response) => {
          this.nutritionist = response;
        },
        error: (err) => {
          console.error('Upload Failed:', err);
        },
      });
  }
  ngOnInit() {
    this.clientService.getAllClients().subscribe((clients: ClientModel[]) => {
      this.patientsList = clients;
    });
  }
}
