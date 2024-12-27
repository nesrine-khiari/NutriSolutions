import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.css'],
})
export class TipComponent {
  @Input() imageUrl: string = 'assets/images/apple.png';
  @Input() text: string =
    'Les pommes peuvent réduire le cholestérol élevé et la pression artérielle.';

  hovered: boolean = false;
}
