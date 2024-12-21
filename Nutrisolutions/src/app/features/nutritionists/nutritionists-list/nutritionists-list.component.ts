import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NutritionistModel } from 'src/app/models/nutritionist.model';
import { ExperienceEnum } from 'src/app/models/recipe.model';
import { NutritionistsService } from 'src/app/services/nutritionists.service';

@Component({
  selector: 'app-nutritionists-list',
  templateUrl: './nutritionists-list.component.html',
  styleUrls: ['./nutritionists-list.component.css'],
})
export class NutritionistsListComponent {
  nutritionists: NutritionistModel[] = [];
  nutritionistsService = inject(NutritionistsService);
  searchControl: FormControl = new FormControl('');
  experienceControl!: FormControl;
  experienceOptions = Object.values(ExperienceEnum);

  pageIndex: number = 0;

  constructor() {
    this.nutritionists = this.nutritionistsService.getAllNutritionists();
    this.experienceControl = new FormControl(ExperienceEnum.ALL);
  }
}
