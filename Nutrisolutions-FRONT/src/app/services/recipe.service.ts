import { Injectable } from '@angular/core';
import { NutritionistModel } from '../models/nutritionist.model';
import {
  generateFakeNutritionist,
  generateFakeRecipe,
} from '../core/helpers/faker.helper';
import { RecipeModel } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private recipes: RecipeModel[] = [];

  constructor() {}

  // Get all recipes
  getAllRecipes(): RecipeModel[] {
    return this.recipes.length
      ? this.recipes
      : this.generateFakeRecipesList(12);
  }

  getPopularRecipes(): RecipeModel[] {
    return this.generateFakeRecipesList(4);
  }

  generateFakeRecipesList(count: number): RecipeModel[] {
    return Array.from({ length: count }, () => generateFakeRecipe());
  }

  // Add a new nutritionist
  addRecipe(recipe: RecipeModel): void {
    this.recipes.push(recipe);
  }

  // Find nutritionist by ID
  getRecipeById(id: string): RecipeModel | undefined {
    return this.recipes.find((recipe) => recipe.id === id);
  }

  // Update a nutritionist
  updateRecipe(id: string, updatedData: Partial<NutritionistModel>): void {
    const index = this.recipes.findIndex((recipe) => recipe.id === id);
    if (index > -1) {
      this.recipes[index] = {
        ...this.recipes[index],
        ...updatedData,
      };
    }
  }

  // Delete a nutritionist
  deleteRecipesist(id: string): void {
    this.recipes = this.recipes.filter((recipe) => recipe.id !== id);
  }
}
