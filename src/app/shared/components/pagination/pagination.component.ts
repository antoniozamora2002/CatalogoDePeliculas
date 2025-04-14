import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() maxVisiblePages: number = 5;

  @Output() prevPage = new EventEmitter<void>();
  @Output() nextPage = new EventEmitter<void>();
  @Output() pageChange = new EventEmitter<number>();

  get paginationArray(): number[] {
    const pages: number[] = [];

    let startPage = Math.max(
      1,
      this.currentPage - Math.floor(this.maxVisiblePages / 2)
    );
    const endPage = Math.min(
      this.totalPages,
      startPage + this.maxVisiblePages - 1
    );

    // Ajustar si estamos cerca del final
    if (endPage - startPage + 1 < this.maxVisiblePages) {
      startPage = Math.max(1, endPage - this.maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  onPrevPage(): void {
    this.prevPage.emit();
  }

  onNextPage(): void {
    this.nextPage.emit();
  }

  onPageChange(page: number): void {
    this.pageChange.emit(page);
  }
}
