import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { APP_API } from 'src/app/core/constants/constants.config';
import { NutritionistModel } from 'src/app/models/nutritionist.model';

@Component({
  selector: 'app-nutritionist-item',
  templateUrl: './nutritionist-item.component.html',
  styleUrls: ['./nutritionist-item.component.css'],
})
export class NutritionistItemComponent {
  base_url = APP_API.base_url;
  @Input({ required: true }) nutritionist!: NutritionistModel;
  router = inject(Router);
  openPlanning = (): void => {
    this.router.navigate([`/nutritionnists/${this.nutritionist.id}/planning`]);
  };
}
