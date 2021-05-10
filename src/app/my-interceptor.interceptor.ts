import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class MyInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const re = '/login';
    if (request.url.search(re) === -1) {
      const token = JSON.parse(localStorage.getItem('user')).accessToken;
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
      });
    }
    return next.handle(request).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['']);
              alert('Session Expired!!\nLogin Again.');
            }
            return;
          }
        }
      )
    );
  }
}
export const interceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: MyInterceptorInterceptor, multi: true },
];

