import { Component, inject } from '@angular/core';
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
  popularRecipes: RecipeModel[] = [];
  bestNutritionists: NutritionistModel[] = [];
  recipesService = inject(RecipesService);
  nutritionistsService = inject(NutritionistsService);

  constructor() {
    this.popularRecipes = this.recipesService.getPopularRecipes();
    this.nutritionistsService
      .getAllNutritionists()
      .subscribe((nutritionists: NutritionistModel[]) => {
        this.bestNutritionists = nutritionists.slice(0, 4);
      });
  }
}
