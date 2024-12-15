import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Place } from 'src/app/types/place';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css'],
})
export class PlacesComponent implements OnInit {
  places: Place[] = [];
  isLoading = true;
  currentPage = 1;
  itemsPerPage = 3;
  totalItems = 0;

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get paginatedPlaces(): Place[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.places.slice(start, start + this.itemsPerPage);
  }

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadPlaces();
  }

  loadPlaces() {
    this.isLoading = true;
    this.api.getPlaces().subscribe({
      next: (places) => {
        this.places = places;
        this.totalItems = places.length;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading places:', err);
        this.isLoading = false;
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }
}
