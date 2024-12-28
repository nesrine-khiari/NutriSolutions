import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { LandingModule } from '../landing/landing.module';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecetteItemComponent } from './recette-item/recette-item.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeDetailsItemComponent } from './recipe-details-item/recipe-details-item.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: RecipesListComponent,
  },
  {
    path: 'add-recipe',
    component: AddRecipeComponent,
  },
  {
    path: 'edit-recipe',
    component: AddRecipeComponent,
  },
  {
    path: 'recipe-details/:id',
    component: RecipeDetailsComponent, // Recipe details route with parameter
  },
];

@NgModule({
  declarations: [
    RecipesListComponent,
    AddRecipeComponent,
    RecipeDetailsComponent,
    RecipeDetailsItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RecipesListComponent,
    LandingModule,
    AddRecipeComponent,
    RecetteItemComponent,
    RecipeDetailsComponent,
  ],
})
export class RecipesModule {}
