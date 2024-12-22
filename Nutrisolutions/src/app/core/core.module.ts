import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeFilterPipe } from './pipes/recipe-filter.pipe';
import { NutritionistsFilterPipe } from './pipes/nutritionists-filter.pipe';

@NgModule({
  declarations: [
    RecipeFilterPipe,
    NutritionistsFilterPipe,
    NutritionistsFilterPipe,
  ],
  imports: [CommonModule],
  exports: [RecipeFilterPipe, NutritionistsFilterPipe],
})
export class CoreModule {}
