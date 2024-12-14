import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, of, throwError } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../types/user';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  _id: string;
  email: string;
  username: string;
  password: string;
  '__v': number,
}

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  private user$ = this.user$$.asObservable();

  user: User | undefined;
  private TOKEN_KEY = 'userToken';
  private REFRESH_TOKEN_KEY = 'refreshToken';

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

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  public tryRestoreSession() {
    const token = this.getToken();
    const refreshToken = this.getRefreshToken();

    if (token && refreshToken) {
      this.validateToken(token).pipe(
        catchError(() => this.refreshTokenRequest())
      ).subscribe({
        next: () => this.getProfile(),
        error: () => this.logout()
      });
    }
  }
  getProfile(): Observable<User> {
    return this.http.get<User>('API_URL');
    // throw new Error('Method not implemented.');
  }

  public validateToken(token: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.API_URL}/users/validate-token`, 
      { token }, 
      { withCredentials: true }
    );
  }

  
  public refreshTokenRequest(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      return this.logout();
    }

    return this.http.post<AuthResponse>(
      `${this.API_URL}/users/refresh-token`, 
      { refreshToken }, 
      { withCredentials: true }
    ).pipe(
      tap((response) => {
        this.storeTokens(response);
      }),
      catchError((error) => {
        this.logout();
        return throwError(error);
      })
    );
  }

  
  public storeTokens(response: AuthResponse) {
    localStorage.setItem(this.TOKEN_KEY, response.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
    
    const user: User = {
      _id: response._id,
      email: response.email,
      username: response.username,
      password: '',
      __v: 0
    };
    
    this.user$$.next(user);
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/users/login`, 
        { email, password }, 
        { withCredentials: true }
      )
      .pipe(
        tap((response) => {
          this.storeTokens(response);
        })
      );
  }

  register(email: string, username: string, password: string, rePassword: string): Observable<User> {
    return this.http
      .post<AuthResponse>(
        `${this.API_URL}/users/register`,
        { email, username, password, rePassword },
        { withCredentials: true }
      )
      .pipe(
        tap((response) => {
          this.storeTokens(response);
        })
      );
  }

  logout(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    
    return this.http
      .post(`${this.API_URL}/users/logout`, 
        { refreshToken }, 
        { 
          headers: new HttpHeaders({
            'X-Authorization': this.getToken() || ''
          }),
          withCredentials: true 
        }
      )
      .pipe(
        tap(() => {
          localStorage.removeItem(this.TOKEN_KEY);
          localStorage.removeItem(this.REFRESH_TOKEN_KEY);
          this.user$$.next(undefined);
          this.user = undefined;
        }),
        catchError((error) => {
          console.error('Logout error:', error);
          localStorage.removeItem(this.TOKEN_KEY);
          localStorage.removeItem(this.REFRESH_TOKEN_KEY);
          this.user$$.next(undefined);
          this.user = undefined;
          
          return of(null);
        })
      );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}