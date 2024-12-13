import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorService } from './core/error/error.service';
import { Router } from '@angular/router';

const { apiUrl } = environment;

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  router: any;
  errorService: any;
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('userToken');
    
    if (token) {
      req = req.clone({
        headers: req.headers.set('X-Authorization', token)
      });
    }

    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401 || err.status === 403) {
          localStorage.removeItem('userToken');
          this.router.navigate(['/auth/login']);
        } else if (err.status === 0) {
          this.errorService.setError('Please, check your internet connection.');
        }
        return throwError(err);
      })
    );
  }
}

export const AppInterceptorProvider: Provider = {
  useClass: AppInterceptor,
  multi: true,
  provide: HTTP_INTERCEPTORS,
};