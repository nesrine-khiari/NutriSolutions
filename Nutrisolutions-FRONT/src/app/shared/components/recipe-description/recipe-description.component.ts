import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-recipe-description',
  templateUrl: './recipe-description.component.html',
  styleUrls: [
    './recipe-description.component.css',
    '../../../../assets/css/list-common.css',
  ],
})
export class RecipeDescriptionComponent {
  @Input({ required: true }) title: string = 'Ingredients :';
  @Input({ required: true }) placeholder: string = 'Ingredients :';
  @Input() details: string[] = [];
  detailControl: FormControl = new FormControl('');

  @Output() enterPressed = new EventEmitter<string[]>();
  addDetail(value: string): void {
    if (value.trim()) {
      this.details.push(value);
      this.enterPressed.emit(this.details);
      this.detailControl.reset();
    }
  }
  deleteDetail(index: number): void {
    this.details.splice(index, 1);
    this.enterPressed.emit(this.details);
  }
}
