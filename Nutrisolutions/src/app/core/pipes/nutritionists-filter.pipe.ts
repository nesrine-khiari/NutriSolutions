import { Pipe, PipeTransform } from '@angular/core';
import { NutritionistModel } from 'src/app/models/nutritionist.model';
import { ExperienceEnum } from 'src/app/models/recipe.model';

@Pipe({
  name: 'nutritionistsFilter',
})
export class NutritionistsFilterPipe implements PipeTransform {
  transform(
    nutritionists: NutritionistModel[],
    searchText: string,
    experience: ExperienceEnum
  ): NutritionistModel[] {
    let filteredNutritionists = nutritionists;

    // Apply search filter
    if (searchText) {
      filteredNutritionists = filteredNutritionists.filter((nutritionist) =>
        nutritionist.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Apply experience filter

    switch (experience) {
      case ExperienceEnum.JUNIOR:
        filteredNutritionists = filteredNutritionists.filter(
          (nutritionist) =>
            nutritionist.experience >= 1 && nutritionist.experience <= 3
        );
        break;
      case ExperienceEnum.MID_LEVEL:
        filteredNutritionists = filteredNutritionists.filter(
          (nutritionist) =>
            nutritionist.experience >= 4 && nutritionist.experience <= 6
        );
        break;
      case ExperienceEnum.SENIOR:
        filteredNutritionists = filteredNutritionists.filter(
          (nutritionist) =>
            nutritionist.experience >= 7 && nutritionist.experience <= 10
        );
        break;
      case ExperienceEnum.SENIOR_PLUS:
        filteredNutritionists = filteredNutritionists.filter(
          (nutritionist) => nutritionist.experience > 10
        );
        break;

      default:
        break;
    }

    return filteredNutritionists;
  }
}
