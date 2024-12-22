import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { LandingModule } from '../landing/landing.module';

@NgModule({
  declarations: [RecipesListComponent],
  imports: [CommonModule, SharedModule, CoreModule],
  exports: [RecipesListComponent, LandingModule],
})
export class RecipesModule {}
