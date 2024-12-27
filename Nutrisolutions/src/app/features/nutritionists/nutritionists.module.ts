import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NutritionistsListComponent } from './nutritionists-list/nutritionists-list.component';
import { NutritionistItemComponent } from './nutritionist-item/nutritionist-item.component';
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [NutritionistsListComponent, NutritionistItemComponent],
  imports: [CommonModule, SharedModule, CoreModule],
  exports: [NutritionistsListComponent, NutritionistItemComponent],
})
export class NutritionistsModule {}
