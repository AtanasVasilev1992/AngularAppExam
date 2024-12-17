import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { UserService } from 'src/app/user/user.service';
import { ApiService } from 'src/app/api.service';
import { Place } from 'src/app/types/place';
import { Museum } from 'src/app/types/museum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  searchResults: { places: Place[], museums: Museum[] } = { places: [], museums: [] };
  showResults = false;
  private searchSubject = new Subject<string>();

  constructor(
    private apiService: ApiService,
    public userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => term ? this.apiService.search(term) : of({ places: [], museums: [] }))
    ).subscribe(results => {
      this.searchResults = results;
      this.showResults = true;
    });
  }

  onSearch() {
    this.searchSubject.next(this.searchTerm);
  }

  hideResults() {
    setTimeout(() => {
      this.showResults = false;
      this.searchTerm = '';
    }, 200);
  }

  clearSearch() {
    this.searchTerm = '';
    this.searchResults = { places: [], museums: [] };
    this.showResults = false;
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

  ngOnDestroy() {
    this.searchSubject.complete();
  }
}