import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeFilterPipe } from './pipes/recipe-filter.pipe';
import { NutritionistsFilterPipe } from './pipes/nutritionists-filter.pipe';
import { NutritionistsTableFilterPipe } from './pipes/nutritionists-table-filter.pipe';
import { GetInitialsPipe } from './pipes/get-initials.pipe';
import { GetAgePipe } from './pipes/get-age.pipe';
import { PasswordCheckDirective } from './directives/password-check.directive';
import { EmailCheckDirective } from './directives/email-check.directive';
import { ConfirmPasswordCheckDirective } from './directives/confirm-password-check.directive';

@NgModule({
  declarations: [
    RecipeFilterPipe,
    NutritionistsFilterPipe,
    NutritionistsFilterPipe,
    NutritionistsTableFilterPipe,
    GetInitialsPipe,
    GetAgePipe,
    PasswordCheckDirective,
    EmailCheckDirective,
    ConfirmPasswordCheckDirective,
  ],
  imports: [CommonModule],
  exports: [
    RecipeFilterPipe,
    NutritionistsFilterPipe,
    NutritionistsTableFilterPipe,
    GetInitialsPipe,
    GetAgePipe,
    PasswordCheckDirective,
    EmailCheckDirective,
    ConfirmPasswordCheckDirective,
  ],
})
export class CoreModule {}
