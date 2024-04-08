import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../types/user';
import { BehaviorSubject, Subscription, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService  implements OnDestroy {
  
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  private user$ = this.user$$.asObservable();
  
  user: User | undefined;
  USER_KEY = '[user]';

  userSubscrition: Subscription;

  get isLoging(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.userSubscrition = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  login(email: string, password: string) {

    return this.http.post<User>('/api/auth/login', { email, password }).pipe(
      tap((user) => {
        this.user$$.next(user);

      })
    );
  }

  register(
    email: string,
    username: string,
    password: string,
    rePassword: string
  ) {
  
    return this.http
      .post<User>('/api/auth/register', {
        email,
        username,
        password,
        rePassword,
      })
    .pipe(tap((user) => {

      this.user$$.next(user)}));
  }

  logout() {
    return this.http
      .post('/api/auth/logout', {})
      .pipe(tap(() => {
        this.user$$.next(undefined)}));
  }

  getProfile() {
    return this.http.get<User>('/api/auth/profile').pipe(tap((user) => this.user$$.next(user)))
  }

  ngOnDestroy(): void {
    this.userSubscrition.unsubscribe();
  }
}
