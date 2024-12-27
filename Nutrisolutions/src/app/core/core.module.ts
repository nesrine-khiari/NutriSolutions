import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeFilterPipe } from './pipes/recipe-filter.pipe';
import { NutritionistsFilterPipe } from './pipes/nutritionists-filter.pipe';
import { NutritionistsTableFilterPipe } from './pipes/nutritionists-table-filter.pipe';

@NgModule({
  declarations: [
    RecipeFilterPipe,
    NutritionistsFilterPipe,
    NutritionistsFilterPipe,
    NutritionistsTableFilterPipe,
  ],
  imports: [CommonModule],
  exports: [RecipeFilterPipe, NutritionistsFilterPipe,NutritionistsTableFilterPipe],
})
export class CoreModule {}
