import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private TOKEN_KEY = 'userToken';
    private REFRESH_TOKEN_KEY = 'refreshToken';
    http: any;

    constructor(private router: Router) {
        this.restoreToken();
    }

    private restoreToken() {
        const token = this.getToken();
        if (token) {
            return true;
        }
        return false;
    }

    validateToken(): Observable<boolean> {
        const token = this.getToken();
        if (!token) {
            return of(false);
        }

        return this.http
            .get(`${environment.apiUrl}/users/profile`, {
                headers: { 'X-Authorization': token },
            })
            .pipe(
                map(() => true),
                catchError(() => {
                    this.clearTokens();
                    return of(false);
                })
            );
    }

    getToken(): string | null {
        const token = localStorage.getItem(this.TOKEN_KEY);
        if (!token) {
            return null;
        }

        return token;
    }

    getRefreshToken(): string | null {
        return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }

    setTokens(accessToken: string, refreshToken: string | undefined) {
        if (accessToken) {
            localStorage.setItem(this.TOKEN_KEY, accessToken);
        }
        if (refreshToken) {
            localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
        }
    }

    clearTokens() {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }

    handleAuthError() {
        this.clearTokens();
        this.router.navigate(['/auth/login']);
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}
