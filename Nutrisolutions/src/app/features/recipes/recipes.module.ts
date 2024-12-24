import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { LandingModule } from '../landing/landing.module';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecetteItemComponent } from './recette-item/recette-item.component';

@NgModule({
  declarations: [RecipesListComponent, AddRecipeComponent],
  imports: [CommonModule, SharedModule, CoreModule],
  exports: [
    RecipesListComponent,
LandingModule,    AddRecipeComponent,
    RecetteItemComponent,
  ],
})
export class RecipesModule {}
