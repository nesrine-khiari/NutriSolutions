import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input() totalPages: number = 20;
  selectedPageIndex: number = 1;
  @Output() pageChanged = new EventEmitter<number>();

  setPage(index: number) {
    this.pageChanged.emit(index);
    this.selectedPageIndex = index;
  }
}
