import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.css'],
})
export class SearchHeaderComponent {
  @Input() formControlName: FormControl = new FormControl('');
  @Input() name: string = 'Charles Doe';
  @Input() imageUrl: string = 'assets/images/avatar.png';
}
