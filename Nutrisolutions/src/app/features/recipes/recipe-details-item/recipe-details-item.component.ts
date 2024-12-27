import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-details-item',
  templateUrl: './recipe-details-item.component.html',
  styleUrls: ['./recipe-details-item.component.css',
    '../../../../assets/css/list-common.css',],
})
export class RecipeDetailsItemComponent {
  @Input() title: string = '';
  @Input() details: string[] = [] ; 
  checkedDetails: Set<number> = new Set();

  toggleDetail(index: number): void {
    if (this.checkedDetails.has(index)) {
      this.checkedDetails.delete(index);
    } else {
      this.checkedDetails.add(index);
    }
  }

  // Method to check if the instruction is checked
  isDetailChecked(index: number): boolean {
    return this.checkedDetails.has(index);
  }
}
