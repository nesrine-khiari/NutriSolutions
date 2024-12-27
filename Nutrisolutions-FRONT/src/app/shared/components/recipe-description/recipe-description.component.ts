import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-recipe-description',
  templateUrl: './recipe-description.component.html',
  styleUrls: ['./recipe-description.component.css',
    '../../../../assets/css/list-common.css',],
})
export class RecipeDescriptionComponent {
  @Input({ required: true }) title: string = 'Ingredients :';
  @Input({ required: true }) placeholder: string = 'Ingredients :';
  details: string[] = [];
  detailControl : FormControl= new FormControl('');
  
  addDetail(value: string): void {
    if (value.trim()) {
      this.details.push(value);
      this.detailControl.reset();
    }
  }
  deleteDetail(index: number): void {
    this.details.splice(index, 1);
  }
}
