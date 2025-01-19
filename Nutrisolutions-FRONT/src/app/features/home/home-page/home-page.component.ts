import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NutritionistModel } from 'src/app/models/nutritionist.model';
import { RecipeModel } from 'src/app/models/recipe.model';
import { NutritionistsService } from 'src/app/services/nutritionists.service';
import { RecipesService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  recetRecipes: RecipeModel[] = [];
  bestNutritionists: NutritionistModel[] = [];
  recipesService = inject(RecipesService);
  nutritionistsService = inject(NutritionistsService);

  constructor() {
    this.recipesService.getAllRecipes().subscribe((recipes: RecipeModel[]) => {
      this.recetRecipes = recipes.slice(0, 4);
    });
    this.nutritionistsService
      .getBestNutritionists()
      .subscribe((nutritionists: NutritionistModel[]) => {
        this.bestNutritionists = nutritionists;
      });
  }

  router = inject(Router);
  navigateToNutritionists() {
    this.router.navigate(['/nutritionists']);
  }
  navigateToRecipes() {
    this.router.navigate(['/recipes']);
  }
}
