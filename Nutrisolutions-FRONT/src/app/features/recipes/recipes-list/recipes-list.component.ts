import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
} from 'rxjs';
import { AppUtils } from 'src/app/core/utils/functions.utils';
import {
  CategoryEnum,
  ObjectifEnum,
  RecipeModel,
} from 'src/app/models/recipe.model';
import { LoggerService } from 'src/app/services/logger.service';
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
  currentPage: number = 1;
  limit: number = 12;
  isLoading: boolean = true;
  updatePage(index: number) {
    this.currentPage = index;
    this.isLoading = true;

    this.recipesService
      .getAllRecipes(
        this.currentPage,
        12,
        this.searchControl.value,
        (this.objectifControl.value as ObjectifEnum) == ObjectifEnum.ALL
          ? ''
          : this.objectifControl.value,

        (this.categoryControl.value as CategoryEnum) == CategoryEnum.ALL
          ? ''
          : this.categoryControl.value
      )
      .subscribe({
        next: (response) => {
          this.recipes = response.data;
          this.totalRecipesCount = response.total;
          // H
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        },
        error: (error) => {
          this.toastr.error(AppUtils.getErrorMessage(error), 'Erreur');
          this.isLoading = false; // H
        },
      });
  }

  getTotalPageNumber() {
    return Math.ceil(this.totalRecipesCount / this.limit);
  }
  searchControl: FormControl = new FormControl('');
  categoryControl: FormControl = new FormControl('');
  objectifControl: FormControl = new FormControl('');

  toastr = inject(ToastrService);
  recipesService = inject(RecipesService);
  logger = inject(LoggerService);

  ngOnInit() {
    this.categoryControl = new FormControl(CategoryEnum.ALL);
    this.objectifControl = new FormControl(ObjectifEnum.ALL);
    combineLatest([
      this.searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged()
      ),
      this.categoryControl.valueChanges.pipe(
        startWith(''),
        distinctUntilChanged()
      ),
      this.objectifControl.valueChanges.pipe(
        startWith(''),
        distinctUntilChanged()
      ),
    ])
      .pipe(
        switchMap(([searchText, category, objectif]) => {
          this.isLoading = true;
          this.logger.info('new call');

          return this.recipesService.getAllRecipes(
            this.currentPage,
            12,
            searchText,
            (objectif as ObjectifEnum) == ObjectifEnum.ALL ? '' : objectif,
            (category as CategoryEnum) == CategoryEnum.ALL ? '' : category
          );
        })
      )
      .subscribe({
        next: (response) => {
          this.recipes = response.data;
          this.totalRecipesCount = response.total;
          setTimeout(() => {
            this.isLoading = false;
          }, 500); // Reduce loading delay for a better UX
        },
        error: (error) => {
          this.toastr.error(AppUtils.getErrorMessage(error), 'Erreur');
          this.isLoading = false;
        },
      });
    this.fetchRecipes();
  }
  fetchRecipes() {
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
        this.toastr.error(AppUtils.getErrorMessage(error), 'Erreur');
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
