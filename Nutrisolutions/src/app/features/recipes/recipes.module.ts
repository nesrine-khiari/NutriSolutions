import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [RecipesListComponent],
  imports: [CommonModule, SharedModule],
  exports: [RecipesListComponent],
})
export class RecipesModule {}
