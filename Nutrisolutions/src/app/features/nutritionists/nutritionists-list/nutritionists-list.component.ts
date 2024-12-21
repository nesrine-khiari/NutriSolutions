import { Component } from '@angular/core';

@Component({
  selector: 'app-nutritionists-list',
  templateUrl: './nutritionists-list.component.html',
  styleUrls: ['./nutritionists-list.component.css'],
})
export class NutritionistsListComponent {
  goalOptions: string[] = [
    'Perdre du poids',
    'Gagner du poids',
    'Développer des muscles',
  ];

  categoryOptions: string[] = [
    'Petit-déjeuner',
    'Déjeuner',
    'Snack',
    'Diner',
  ];

  selectedGoal: string = '';
  selectedCategory: string = '';

  selectGoal(goal: string): void {
    this.selectedGoal = goal;
    console.log('New goal selected: ' + this.selectedGoal);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    console.log('New category selected: ' + this.selectedCategory);
  }
}
