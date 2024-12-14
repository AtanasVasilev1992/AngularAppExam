import { Component, Injector, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Museum } from 'src/app/types/museum';

@Component({
  selector: 'app-museums',
  templateUrl: './museums.component.html',
  styleUrls: ['./museums.component.css']
})
export class MuseumsComponent implements OnInit {
  museums: Museum[] = [];
  isLoading = true;

  constructor(private api: ApiService, private injector: Injector) {
    console.log('MuseumsComponent constructed');
  }

  ngOnInit(): void {
    console.log('MuseumsComponent initializing');
    
    this.api.getMuseums().subscribe({
      next: (museums) => {
        console.log('Museums received:', museums);
        this.museums = museums;
        setTimeout(() => {
          this.isLoading = false;
          console.log('Loading complete');
        }, 500);
      },
      error: (error) => {
        console.error('Error loading museums:', error);
        this.isLoading = false;
      }
    });
  }
}
