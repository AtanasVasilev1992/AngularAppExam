import { Component, Injector, OnInit } from '@angular/core';
import { cardAnimations } from 'src/app/animations/card.animations';
import { ApiService } from 'src/app/api.service';
import { Museum } from 'src/app/types/museum';

@Component({
  selector: 'app-museums',
  templateUrl: './museums.component.html',
  styleUrls: ['./museums.component.css'],
  animations: [
      cardAnimations.cardList,
      cardAnimations.buttonHover
    ]
})
export class MuseumsComponent implements OnInit {
  museums: Museum[] = [];
  isLoading = true;
  currentPage = 1;
  itemsPerPage = 3;
  totalItems = 0;

  get totalPages(): number {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    }
  
    get paginatedMuseums(): Museum[] {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.museums.slice(start, start + this.itemsPerPage);
    }
  

  constructor(private api: ApiService, private injector: Injector) {
    console.log('MuseumsComponent constructed');
  }

  ngOnInit(): void {
    this.loadMuseums();
  }

  loadMuseums() {
    this.isLoading = true;
    this.api.getMuseums().subscribe({
      next: (museums) => {
        this.museums = museums;
        this.totalItems = museums.length;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading museums:', err);
        this.isLoading = false;
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }
}
