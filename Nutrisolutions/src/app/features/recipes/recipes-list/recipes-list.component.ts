import { Component, inject } from '@angular/core';
import { RecipeModel } from 'src/app/models/nutritionist.model copy';
import { RecipesService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent {
  recipes: RecipeModel[] = [];
  recipesService = inject(RecipesService);

  constructor() {
    this.recipes = this.recipesService.getAllRecipes();
  }
}
