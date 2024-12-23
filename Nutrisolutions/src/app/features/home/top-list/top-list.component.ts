import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-top-list',
  templateUrl: './top-list.component.html',
  styleUrls: ['./top-list.component.css'],
})
export class TopListComponent {
  @Input() title: string = '';
}
