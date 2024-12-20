import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recette-item',
  templateUrl: './recette-item.component.html',
  styleUrls: ['./recette-item.component.css'],
})
export class RecetteItemComponent {
  @Input() name: string = 'Catlecia';
  @Input() description: string =
    'Lorem ipsum tese rata ben kamer houca hoven  ';
  @Input() calories: number = 100;
}
