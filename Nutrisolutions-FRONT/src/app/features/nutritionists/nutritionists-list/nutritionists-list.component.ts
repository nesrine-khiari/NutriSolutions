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
import { NutritionistModel } from 'src/app/models/nutritionist.model';
import {
  CategoryEnum,
  ExperienceEnum,
  ObjectifEnum,
} from 'src/app/models/recipe.model';
import { LoggerService } from 'src/app/services/logger.service';
import { NutritionistsService } from 'src/app/services/nutritionists.service';

@Component({
  selector: 'app-nutritionists-list',
  templateUrl: './nutritionists-list.component.html',
  styleUrls: [
    './nutritionists-list.component.css',
    '../../../../assets/css/list-common.css',
  ],
})
export class NutritionistsListComponent {
  nutritionists: NutritionistModel[] = [];
  nutritionistsService = inject(NutritionistsService);
  searchControl: FormControl = new FormControl('');
  experienceControl!: FormControl;
  experienceOptions = Object.values(ExperienceEnum);
  totalNutritionistsCount: number = 0;
  currentPage: number = 1;
  limit: number = 12;
  isLoading: boolean = false;
  toastr = inject(ToastrService);

  constructor() {
    this.nutritionistsService
      .getAllNutritionists(1, this.limit)
      .subscribe((response) => {
        this.nutritionists = response.data;
      });
  }
  logger = inject(LoggerService);
  ngOnInit() {
    this.experienceControl = new FormControl(ExperienceEnum.ALL);

    combineLatest([
      this.searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged()
      ),
      this.experienceControl.valueChanges.pipe(
        startWith(''),
        distinctUntilChanged()
      ),
    ])
      .pipe(
        switchMap(([searchText, experience]) => {
          this.isLoading = true;
          this.logger.info('new call');
          return this.nutritionistsService.getAllNutritionists(
            1,
            12,
            searchText,
            (experience as ExperienceEnum) == ExperienceEnum.ALL
              ? ''
              : experience
          );
        })
      )
      .subscribe({
        next: (response) => {
          this.nutritionists = response.data;
          this.totalNutritionistsCount = response.total;
          setTimeout(() => {
            this.isLoading = false;
          }, 500); // Reduce loading delay for a better UX
        },
        error: (error) => {
          this.toastr.error(AppUtils.getErrorMessage(error), 'Erreur');
          this.isLoading = false;
        },
      });
    this.fetchNutritionists();
  }
  fetchNutritionists() {
    this.isLoading = true;
    this.nutritionistsService.getAllNutritionists(this.currentPage).subscribe({
      next: (response) => {
        this.nutritionists = response.data;
        this.totalNutritionistsCount = response.total;

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
    return Math.ceil(this.totalNutritionistsCount / this.limit);
  }
  updatePage(index: number) {
    this.currentPage = index;
    this.isLoading = true;

    this.nutritionistsService
      .getAllNutritionists(
        this.currentPage,
        12,
        this.searchControl.value,
        (this.experienceControl.value as ExperienceEnum) == ExperienceEnum.ALL
          ? ''
          : this.experienceControl.value
      )
      .subscribe({
        next: (response) => {
          this.nutritionists = response.data;
          this.totalNutritionistsCount = response.total;
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
}
