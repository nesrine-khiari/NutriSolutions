import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nutritionist-item',
  templateUrl: './nutritionist-item.component.html',
  styleUrls: ['./nutritionist-item.component.css'],
})
export class NutritionistItemComponent {
  @Input() name: string = 'Houcem';
  @Input() patientsNumber: number = 20;
  @Input() yearsOfExperience: number = 5;
}
