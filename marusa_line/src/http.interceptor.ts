import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { AppRoutes } from './app/shared/AppRoutes/AppRoutes';
import { AuthorizationService } from './app/pages/authorization/authorization.service';

export const httpInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem("token");
  const authService = inject(AuthorizationService);
  if (token) {
    request = request.clone({
      setHeaders: {
        "Authorization": `Bearer ${token}`,
        ...(request.headers.has('Toro') ? {} : {
          "Control-Allow-Origin": "*",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Content-Type": "application/json"
        })
      }
    });
  }
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
        authService.show();
      }
      else if(error.status === 403){

      }
      return throwError(() => error);
    }),
    finalize(() => {
      setTimeout(() => {
      });
    })
  );
  function redirectToLogin(): void {
  }
};
