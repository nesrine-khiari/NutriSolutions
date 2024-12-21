import { Component, inject, Inject } from '@angular/core';
import { NutritionistModel } from 'src/app/models/nutritionist.model';
import { NutritionistsService } from 'src/app/services/nutritionists.service';

@Component({
  selector: 'app-nutritionists-list',
  templateUrl: './nutritionists-list.component.html',
  styleUrls: ['./nutritionists-list.component.css'],
})
export class NutritionistsListComponent {
  nutritionists: NutritionistModel[] = [];
  nutritionistsService = inject(NutritionistsService);

  constructor() {
    this.nutritionists = this.nutritionistsService.getAllNutritionists();
  }
}
