import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { CookiesStorageService } from '../services/cookies-state.service';
import { environment } from '../../environments/environment.development';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookies = inject(CookiesStorageService);

  if (req.url.includes(environment.AUTH_API_URL)) {
    return next(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          const body = event.body as any;
          if (body?.access_token) {
            const expirationDate = new Date(Date.now() + 3600000);
            cookies.setKey('access_token', body.access_token, expirationDate);
          }
        }
      })
    );
  }

  if (req.url.includes(environment.API_URL)) {
    const token = cookies.getKeyValue('access_token');
    if (token) {
      const authReq = req.clone({
        headers: req.headers.append('Authorization', `Bearer ${token}`)
      });
      return next(authReq);
    }
  }

  return next(req);
};