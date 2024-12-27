import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input() totalPages: number = 20;
  @Input() selectedPageIndex: number = 0;
  @Output() pageChanged = new EventEmitter<number>();

  setPage(index: number) {
    this.pageChanged.emit(index);
    this.selectedPageIndex = index;
  }

  getNumberSequence() {
    return Array.from({ length: 2 }, (_, i) => this.selectedPageIndex + i);
  }
}
