import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, catchError, switchMap } from 'rxjs';
import { AuthRefreshPost200Response } from '../../../../api-client';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private _auth = inject(AuthService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this._auth.getToken();
    req = this.addTokenHandler(req, token);
    return next.handle(req).pipe(
      catchError((e) => {
        if (e.status === 401) {
          return this.refreshTokenHandler(req, next);
        }
        console.log(e);
        throw e;
      })
    );
  }

  private refreshTokenHandler(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this._auth.refreshToken().pipe(
      switchMap((v: AuthRefreshPost200Response) => {
        req = this.addTokenHandler(req, v.token);
        return next.handle(req);
      }),
      catchError((err) => {
        this._auth.logout();
        throw err;
      })
    );
  }

  private addTokenHandler(req: HttpRequest<any>, token?: string | null) {
    if (token) {
      return req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return req;
  }
}
