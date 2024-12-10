import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../types/user';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  user: User | undefined;
  USER_KEY = '[auth]';

  userSubscription: Subscription;

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  private readonly API_URL = 'http://localhost:3030'; // Базовият URL на сървъра

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    return this.http
      .post<User>(`${this.API_URL}/users/login`, { email, password }, { withCredentials: true })
      .pipe(
        tap((user) => {
          this.user$$.next(user);
        })
      );
  }

  register(email: string, username: string, password: string, rePassword: string) {
    return this.http
      .post<User>(
        `${this.API_URL}/users/register`,
        { email, username, password, rePassword },
        { withCredentials: true }
      )
      .pipe(
        tap((user) => {
          this.user$$.next(user);
        })
      );
  }

  logout() {
    return this.http
      .get(`${this.API_URL}/users/logout`, { withCredentials: true })
      .pipe(
        tap(() => {
          this.user$$.next(undefined);
          this.user = undefined;
        })
      );
  }

  getProfile() {
    return this.http
      .get<User>(`${this.API_URL}/users/me`, { withCredentials: true })
      .pipe(
        tap((user) => {
          this.user$$.next(user);
        })
      );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
