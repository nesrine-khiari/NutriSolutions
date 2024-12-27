import { Pipe, PipeTransform } from '@angular/core';
import {
  CategoryEnum,
  ObjectifEnum,
  RecipeModel,
} from 'src/app/models/recipe.model';

@Pipe({
  name: 'recipeFilter',
})
export class RecipeFilterPipe implements PipeTransform {
  transform(
    recipes: RecipeModel[],
    searchText: string,
    category: CategoryEnum,
    objectif: ObjectifEnum
  ): RecipeModel[] {
    let filteredRecipes = recipes;

    // Apply search filter
    if (searchText) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Apply category filter
    if (category != CategoryEnum.ALL) {
      filteredRecipes = filteredRecipes.filter(
        (recipe) => recipe.category === category
      );
    }

    // Apply objectif filter
    if (objectif != ObjectifEnum.ALL) {
      filteredRecipes = filteredRecipes.filter(
        (recipe) => recipe.objectif === objectif
      );
    }

    return filteredRecipes;
  }
}
