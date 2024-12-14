import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../types/user';
import { AuthService } from '../auth.service';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  _id: string;
  email: string;
  username: string;
  __v: number;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private readonly API_URL = environment.apiUrl;
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  get user(): User | undefined {
    return this.user$$.value;
  }
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.tryAutoLogin();
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  private tryAutoLogin() {
    if (this.authService.isAuthenticated()) {
      this.getProfile().subscribe({
        next: (user) => this.user$$.next(user),
        error: () => this.authService.clearTokens()
      });
    }
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<AuthResponse>(
      `${this.API_URL}/users/login`,
      { email, password },
      { withCredentials: true }
    ).pipe(
      tap(response => {
        console.log('Login response:', response); // Debug info
        this.authService.setTokens(response.accessToken, response.refreshToken);
        const user: User = {
          _id: response._id,
          email: response.email,
          username: response.username,
          password: '',
          __v: 0
        };
        this.user$$.next(user);
      })
    );
  }

  register(email: string, username: string, password: string, rePassword: string): Observable<User> {
    return this.http.post<AuthResponse>(
      `${this.API_URL}/users/register`,
      { email, username, password, rePassword },
      { withCredentials: true }
    ).pipe(
      tap(response => {
        this.authService.setTokens(response.accessToken, response.refreshToken);
        const user: User = {
          _id: response._id,
          email: response.email,
          username: response.username,
          password: '',
          __v: 0
        };
        this.user$$.next(user);
      })
    );
  }

  logout() {
    const token = this.authService.getToken();
    return this.http.post(
      `${this.API_URL}/users/logout`,
      {},
      {
        headers: { 'X-Authorization': token || '' },
        withCredentials: true
      }
    ).pipe(
      tap(() => {
        this.authService.clearTokens();
        this.user$$.next(undefined);
      })
    );
  }

  getProfile(): Observable<User> {
    const token = this.authService.getToken();
    return this.http.get<User>(
      `${this.API_URL}/users/profile`,
      {
        headers: { 'X-Authorization': token || '' },
        withCredentials: true
      }
    ).pipe(
      tap(user => this.user$$.next(user))
    );
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}