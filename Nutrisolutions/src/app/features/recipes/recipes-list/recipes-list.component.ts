import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  CategoryEnum,
  ObjectifEnum,
  RecipeModel,
} from 'src/app/models/recipe.model';
import { RecipesService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent {
  recipes: RecipeModel[] = [];
  recipesService = inject(RecipesService);
  currentPage: number = 0;

  updatePage(index: number) {
    this.currentPage = index;
    //api call for next page
  }

  searchControl: FormControl = new FormControl('');
  categoryControl!: FormControl;
  objectifControl!: FormControl;
  ngOnInit() {
    this.categoryControl = new FormControl(CategoryEnum.ALL);
    this.objectifControl = new FormControl(ObjectifEnum.ALL);
  }
  constructor() {
    this.recipes = this.recipesService.getAllRecipes();
  }
  objectifOptions = Object.values(ObjectifEnum);
  selectedObjectif: string = '';
  selectObjectif(objectif: string) {
    this.selectedObjectif = objectif;
  }
  categoryOptions = Object.values(CategoryEnum);
  selectedCategory: string = '';
  selectCategory(category: string) {
    this.selectedCategory = category;
  }
}
