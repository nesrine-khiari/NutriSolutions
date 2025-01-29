import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppUtils } from 'src/app/core/utils/functions.utils';
import { NutritionistModel } from 'src/app/models/nutritionist.model';
import { ExperienceEnum } from 'src/app/models/recipe.model';
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
  currentPage: number = 0;
  limit: number = 12;
  isLoading: boolean = false;
  pageIndex: number = 0;
  toastr = inject(ToastrService);

  constructor() {
    this.nutritionistsService
      .getAllNutritionists(1, this.limit)
      .subscribe((response) => {
        this.nutritionists = response.data;
      });
    this.experienceControl = new FormControl(ExperienceEnum.ALL);
  }
  getTotalPageNumber() {
    return Math.ceil(this.totalNutritionistsCount / this.limit);
  }
  updatePage(index: number) {
    this.currentPage = index;
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
        this.toastr.error(AppUtils.getErrorMessage(error), 'Error');
        this.isLoading = false; // H
      },
    });
  }
}
