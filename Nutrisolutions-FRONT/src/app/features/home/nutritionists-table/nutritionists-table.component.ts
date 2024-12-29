import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
// import { generateFakeNutritionist } from 'src/app/core/helpers/faker.helper';
import {
  NutritionistModel,
  StatusEnum,
  StatusEnumFilter,
  TrieEnum,
} from 'src/app/models/nutritionist.model';
import { NutritionistsService } from 'src/app/services/nutritionists.service';

@Component({
  selector: 'app-nutritionists-table',
  templateUrl: './nutritionists-table.component.html',
  styleUrls: [
    './nutritionists-table.component.css',
    '../../../../assets/css/list-common.css',
  ],
})
export class NutritionistsTableComponent {
  searchControl: FormControl = new FormControl('');
  trieControl: FormControl = new FormControl(TrieEnum.ALL);
  statusControl: FormControl = new FormControl(StatusEnumFilter.ALL);
  statusOptions = Object.values(StatusEnum);
  trieOptions = Object.values(TrieEnum);
  statusEnum = StatusEnum;
  nutritionists: NutritionistModel[] = [];
 nutritionistService = inject(NutritionistsService);
  constructor() {
    this.generateNutritionists(10); // Generate 10 fake nutritionists
  }

  generateNutritionists(count: number): void {
    this.nutritionistService.getAllNutritionists().subscribe((data) => {
      this.nutritionists = data;
    });
  }

  updateStatus(nutritionist: NutritionistModel, newStatus: StatusEnum): void {
    nutritionist.status = newStatus;
  }
  highlightText(content: string, search: string): string {
    if (!search) {
      return content;
    } // Return the original content if search is empty

    // Escape special characters in the search term
    const escapedSearch = search.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&');

    // Create a case-insensitive regex for the search term
    const regex = new RegExp(`(${escapedSearch})`, 'gi');

    // Wrap matches with a span
    return content.replace(
      regex,
      (match) => `<span class="highlight">${match}</span>`
    );
  }
}
