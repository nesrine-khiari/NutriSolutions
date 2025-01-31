import { Component, inject } from '@angular/core';
import { AppUtils } from 'src/app/core/utils/functions.utils';
import { ClientService } from 'src/app/services/client.service';
import { NutritionistsService } from 'src/app/services/nutritionists.service';
import { RecipesService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  nutritionistsCount: number = 0;
  clientsCount: number = 0;
  recipesCount: number = 0;
  nutritionistService = inject(NutritionistsService);
  clientService = inject(ClientService);
  recipeService = inject(RecipesService);
  getCssVariable(variableName: string): string {
    return AppUtils.getCssVariable(variableName);
  }
  constructor() {
    this.nutritionistService.getNutritionistsCount().subscribe({
      next: (response) => {
        this.nutritionistsCount = response.total;
      },
    });
    this.clientService.getClientsCount().subscribe({
      next: (response) => {
        this.clientsCount = response.total;
      },
    });
    this.recipeService.getRecipesCount().subscribe({
      next: (response) => {
        this.recipesCount = response.total;
      },
    });
  }
}
