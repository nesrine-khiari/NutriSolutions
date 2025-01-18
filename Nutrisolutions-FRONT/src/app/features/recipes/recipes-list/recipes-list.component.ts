import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  CategoryEnum,
  ObjectifEnum,
  RecipeModel,
} from 'src/app/models/recipe.model';
import { RecipesService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: [
    './recipes-list.component.css',
    '../../../../assets/css/list-common.css',
  ],
})
export class RecipesListComponent {
  recipes: RecipeModel[] = [];
  currentPage: number = 0;

  updatePage(index: number) {
    this.currentPage = index;
    //api call for next page
  }

  searchControl: FormControl = new FormControl('');
  categoryControl!: FormControl;
  objectifControl!: FormControl;

  toastr = inject(ToastrService);
  recipesService = inject(RecipesService);

  ngOnInit() {
    this.categoryControl = new FormControl(CategoryEnum.ALL);
    this.objectifControl = new FormControl(ObjectifEnum.ALL);
  }
  constructor() {
    this.recipesService.getAllRecipes().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
      },
      error: (error) => {
        const errorMessage = error?.error?.message || 'An error occurred';
        this.toastr.error(errorMessage, 'Error');
      },
    });
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
