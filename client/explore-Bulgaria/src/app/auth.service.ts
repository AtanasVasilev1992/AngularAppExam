import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private TOKEN_KEY = 'userToken';
  private REFRESH_TOKEN_KEY = 'refreshToken';

  constructor(private router: Router) {
    // Проверка за съществуващ токен при инициализация
    this.restoreToken();
  }

  private restoreToken() {
    const token = this.getToken();
    if (token) {
      // Тук можем да добавим допълнителна валидация на токена ако е нужно
      console.log('Restored token:', token);
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
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