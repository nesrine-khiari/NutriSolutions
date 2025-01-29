import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppUtils } from 'src/app/core/utils/functions.utils';
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
  totalRecipesCount: number = 0;
  currentPage: number = 0;
  limit: number = 12;
  isLoading: boolean = true;
  updatePage(index: number) {
    this.currentPage = index;
    this.isLoading = true;

    this.recipesService.getAllRecipes(this.currentPage).subscribe({
      next: (response) => {
        this.recipes = response.data;
        this.totalRecipesCount = response.total;
        // H
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      },
      error: (error) => {
        this.toastr.error(AppUtils.getErrorMessage(error), 'Error');
        this.isLoading = false; // H
      },
    });
  }

  getTotalPageNumber() {
    return Math.ceil(this.totalRecipesCount / this.limit);
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
    this.recipesService.getAllRecipes(this.currentPage).subscribe({
      next: (response) => {
        this.recipes = response.data;
        this.totalRecipesCount = response.total;
        // H
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      },
      error: (error) => {
        this.toastr.error(AppUtils.getErrorMessage(error), 'Error');
        this.isLoading = false; // H
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
