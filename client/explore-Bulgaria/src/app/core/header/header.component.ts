import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { ApiService } from 'src/app/api.service';
import { Place } from 'src/app/types/place';
import { Museum } from 'src/app/types/museum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchTerm: string = '';
  searchResults: { places: Place[], museums: Museum[] } = { places: [], museums: [] };
  showResults = false;

  constructor(
    private apiService: ApiService,
    public userService: UserService,
    private router: Router
  ) {}

  onSearch() {
    if (this.searchTerm.length >= 2) {
      this.apiService.search(this.searchTerm).subscribe(results => {
        this.searchResults = results;
        this.showResults = true;
      });
    } else {
      this.searchResults = { places: [], museums: [] };
      this.showResults = false;
    }
  }

  
  clearSearch() {
    this.searchTerm = '';
    this.searchResults = { places: [], museums: [] };
    this.showResults = false;
  }

  hideResults() {
    setTimeout(() => {
      this.clearSearch();
    }, 200);
  }

  onResultClick() {
    this.clearSearch();
  }

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  get username(): string {
    return this.userService.user?.username || '';
  }

  logout() {
    this.userService.logout().subscribe({
      next: () => this.router.navigate(['/']),
      error: () => {
        this.router.navigate(['/'])
      }
    });
  }
}