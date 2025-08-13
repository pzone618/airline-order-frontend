import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  let clonedReq = req;
  if (token) {
    // 检查token是否过期
    if (authService.isTokenExpired()) {
      authService.logout();
      router.navigate(['/login'], { queryParams: { returnUrl: router.url } });
      return throwError(() => new Error('Token expired'));
    }

    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
        const currentUrl = router.url;
        router.navigate(['/login'], { queryParams: { returnUrl: currentUrl } });
      }
      return throwError(() => error);
    })
  );
};
