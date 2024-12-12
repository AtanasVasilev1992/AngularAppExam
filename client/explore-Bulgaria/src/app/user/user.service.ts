import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../types/user';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface LoginResponse {
  accessToken: string;
  _id: string;
  email: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  user: User | undefined;
  private TOKEN_KEY = 'userToken';

  userSubscription: Subscription;

  get isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
    
    this.tryRestoreSession();
  }

  private getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private tryRestoreSession() {
    const token = this.getToken();
    if (token) {
      this.getProfile().subscribe({
        error: () => this.logout()
      });
    }
  }

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(`${this.API_URL}/users/login`, { email, password }, { withCredentials: true })
      .pipe(
        tap((response) => {
          // Записване на accessToken
          localStorage.setItem(this.TOKEN_KEY, response.accessToken);
          
          // Създаване на обект потребител
          const user: User = {
            _id: response._id,
            email: response.email,
            username: response.username,
            password: '', // не съхранявайте паролата
            __v: 0
          };
          
          this.user$$.next(user);
        })
      );
  }

  register(email: string, username: string, password: string, rePassword: string) {
    return this.http
      .post<LoginResponse>(
        `${this.API_URL}/users/register`,
        { email, username, password, rePassword },
        { withCredentials: true }
      )
      .pipe(
        tap((response) => {
          // Записване на accessToken
          localStorage.setItem(this.TOKEN_KEY, response.accessToken);
          
          // Създаване на обект потребител
          const user: User = {
            _id: response._id,
            email: response.email,
            username: response.username,
            password: '', // не съхранявайте паролата
            __v: 0
          };
          
          this.user$$.next(user);
        })
      );
  }

  logout() {
    return this.http
      .get(`${this.API_URL}/users/logout`, { withCredentials: true })
      .pipe(
        tap(() => {
          localStorage.removeItem(this.TOKEN_KEY);
          this.user$$.next(undefined);
          this.user = undefined;
        })
      );
  }

  getProfile() {
    const token = this.getToken();
    return this.http
      .get<User>(`${this.API_URL}/users/profile`, { 
        headers: { 'X-Authorization': token || '' },
        withCredentials: true 
      })
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