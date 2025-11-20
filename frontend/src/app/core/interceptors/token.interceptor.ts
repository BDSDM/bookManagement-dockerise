import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    let request = req;
    if (token) {
      console.log('Mon token: ' + token);

      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur HTTP interceptée :', {
          status: error.status,
          message: error.message,
          url: error.url,
        });

        // Tu peux ici faire plus : rediriger vers login, afficher un toast, etc.

        return throwError(() => error); // Important pour que l’erreur remonte correctement
      })
    );
  }
}
