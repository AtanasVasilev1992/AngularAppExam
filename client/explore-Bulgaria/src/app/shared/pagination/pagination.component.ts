import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
    @Input() currentPage: number = 1;
    @Input() totalPages: number = 1;
    @Input() itemsPerPage: number = 10;
    @Output() pageChange = new EventEmitter<number>();

    pages: number[] = [];

    ngOnChanges(): void {
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    onPageChange(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.pageChange.emit(page);
        }
    }
}
