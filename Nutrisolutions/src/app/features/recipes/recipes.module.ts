import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';



@NgModule({
  declarations: [RecipesListComponent, AddRecipeComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    RecipesListComponent,
    AddRecipeComponent
  ]
})
export class RecipesModule { }
