import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthResponse, User } from '../types/user';
import { AuthService } from '../auth.service';

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

    constructor(private http: HttpClient, private authService: AuthService) {
        this.autoLoadProfile();
    }
    ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }

    private autoLoadProfile() {
        if (this.authService.getToken()) {
            this.getProfile()
                .pipe(
                    catchError((err) => {
                        console.error('Error loading profile:', err);
                        this.authService.clearTokens();
                        return EMPTY;
                    })
                )
                .subscribe({
                    next: (user) => {
                        if (user) {
                            this.user$$.next(user);
                        } else {
                            console.error('Invalid user profile response');
                            this.authService.clearTokens();
                        }
                    },
                });
        }
    }

    login(email: string, password: string): Observable<User> {
        return this.http
            .post<AuthResponse>(
                `${this.API_URL}/users/login`,
                { email, password },
                { withCredentials: true }
            )
            .pipe(
                tap((response) => {
                    this.authService.setTokens(
                        response.accessToken,
                        response.refreshToken
                    );
                    const user: User = {
                        _id: response._id,
                        email: response.email,
                        username: response.username,
                        password: '',
                        __v: 0,
                    };
                    this.user$$.next(user);
                }),
                catchError((error) => {
                    console.error('Login failed:', error);
                    return throwError(() => error);
                })
            );
    }

    register(
        email: string,
        username: string,
        password: string,
        rePassword: string
    ): Observable<User> {
        return this.http
            .post<AuthResponse>(
                `${this.API_URL}/users/register`,
                { email, username, password, rePassword },
                { withCredentials: true }
            )
            .pipe(
                tap((response) => {
                    this.authService.setTokens(
                        response.accessToken,
                        response.refreshToken
                    );
                    const user: User = {
                        _id: response._id,
                        email: response.email,
                        username: response.username,
                        password: '',
                        __v: 0,
                    };
                    this.user$$.next(user);
                })
            );
    }

    logout() {
        const token = this.authService.getToken();
        return this.http
            .post(
                `${this.API_URL}/users/logout`,
                {},
                {
                    headers: { 'X-Authorization': token || '' },
                    withCredentials: true,
                }
            )
            .pipe(
                tap(() => {
                    this.authService.clearTokens();
                    this.user$$.next(undefined);
                })
            );
    }

    getProfile(): Observable<User> {
        return this.http.get<User>(`${this.API_URL}/users/me`, {
            headers: {
                'X-Authorization': this.authService.getToken() || '',
            },
        });
    }

    isLoggedIn(): boolean {
        return !!this.user$$.value && !!this.authService.getToken();
    }
}
