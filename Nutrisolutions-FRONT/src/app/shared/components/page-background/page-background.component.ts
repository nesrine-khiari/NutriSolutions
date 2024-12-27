import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-background',
  templateUrl: './page-background.component.html',
  styleUrls: ['./page-background.component.css'],
})
export class PageBackgroundComponent {
  @Input() quote: string = '';
}
