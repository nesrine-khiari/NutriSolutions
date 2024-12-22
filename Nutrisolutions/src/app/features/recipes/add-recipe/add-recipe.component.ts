import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  CategoryEnum,
  ObjectifEnum,
  PreparationTimeEnum,
} from 'src/app/models/recipe.model';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
})
export class AddRecipeComponent {
  titleControl: FormControl= new FormControl('');
  categoryControl!: FormControl;
  objectifControl!: FormControl;
  preptimeControl!: FormControl;
  objectifOptions = Object.values(ObjectifEnum).filter(
    (objectif) => objectif != ObjectifEnum.ALL
  );
  preptimeOptions = Object.values(PreparationTimeEnum).filter(
    (preptime) => preptime != PreparationTimeEnum.ALL
  );

  ngOnInit() {
    this.categoryControl = new FormControl(CategoryEnum.DINER);
    this.objectifControl = new FormControl(ObjectifEnum.PERDRE_POIDS);
    this.preptimeControl = new FormControl(PreparationTimeEnum.VERY_SHORT);
  }

  categoryOptions = Object.values(CategoryEnum).filter(
    (category) => category != CategoryEnum.ALL
  );

  items = [
    {
      image: 'assets/images/proteins.png',
      placeholder: 'Proteins (g)',
      formControlName: new FormControl(''),
    },
    {
      image: 'assets/images/lipid.png',
      placeholder: 'Lipides (g)',
      formControlName: new FormControl(''),
    },
    {
      image: 'assets/images/carbohydrate.png',
      placeholder: 'Glucides (g)',
      formControlName: new FormControl(''),
    },
    {
      image: 'assets/images/calories.png',
      placeholder: 'Calorie (Kcal)',
      formControlName: new FormControl(''),
    },
  ];
}
