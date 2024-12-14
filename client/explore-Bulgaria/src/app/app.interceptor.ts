import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user/user.service';
import { Router } from '@angular/router';

const { apiUrl } = environment;

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService, 
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('userToken');
    
    if (token) {
      req = req.clone({
        setHeaders: {
          'X-Authorization': token
        }
      });
    }

    return next.handle(req).pipe(
      catchError((err) => {
      
        if (err.status === 401 || err.status === 403) {
          
          return this.handleUnauthorizedError(req, next);
        } else if (err.status === 0) {
         
          this.router.navigate(['/error'], { 
            queryParams: { 
              message: 'Моля, проверете интернет връзката си.' 
            } 
          });
        }
        return throwError(err);
      })
    );
  }

  private handleUnauthorizedError(
    request: HttpRequest<any>, 
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    return this.userService.refreshTokenRequest().pipe(
      switchMap((response) => {
       
        const newRequest = request.clone({
          setHeaders: {
            'X-Authorization': response.accessToken
          }
        });
        
        
        return next.handle(newRequest);
      }),
      catchError((error) => {
        
        this.userService.logout();
        this.router.navigate(['/auth/login']);
        return throwError(error);
      })
    );
  }
}

export const AppInterceptorProvider: Provider = {
  useClass: AppInterceptor,
  multi: true,
  provide: HTTP_INTERCEPTORS,
};