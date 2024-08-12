import { Injectable, inject } from '@angular/core';

import { REFRESH_TOKEN_KEY, TOKEN_KEY } from '../../constants';
import { User } from '../models/user.model';
import {
  AuthControllerClientService,
  AuthLoginPostRequest,
  AuthRefreshPost200Response,
  AuthRefreshPostRequest,
} from '../../../../api-client';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = inject(AuthControllerClientService);
  private _router = inject(Router);

  public loginUser(
    login: AuthLoginPostRequest,
    onLogin: () => void,
    onError: (e: Error) => void
  ) {
    this._auth.authLoginPost(login).subscribe({
      next: (v) => {
        this.setToken(v.token!, v.refreshToken!);
        onLogin();
      },
      error: (e) => {
        onError(e);
      },
    });
  }

  private setToken(userToken: string, refreshToken: string): void {
    localStorage.setItem(TOKEN_KEY, userToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  private removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  public getToken(): string | null {
    let token = localStorage.getItem(TOKEN_KEY);
    if (token) if (this.isTokenValid(token!)) return token;
    return null;
  }

  public refreshToken(): Observable<AuthRefreshPost200Response> {
    let token = localStorage.getItem(TOKEN_KEY);
    let refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    return this._auth
      .authRefreshPost({
        token: token,
        refreshToken: refreshToken,
      } as AuthRefreshPostRequest)
      .pipe(
        tap((response: any) => {
          localStorage.setItem(TOKEN_KEY, response.token);
          localStorage.setItem(REFRESH_TOKEN_KEY, response.refreshToken);
        })
      );
  }

  public getUser(): User | null {
    let token = localStorage.getItem(TOKEN_KEY);
    if (this.isTokenValid(token!)) {
      return new User(token!);
    }
    this.logout();
    return null;
  }

  private isTokenValid(userToken: string): User | undefined {
    let user = new User(userToken);
    if (!user.isTokenActive()) {
      return undefined;
    }
    return user;
  }

  public logout() {
    this.removeToken();
    this.navigate();
  }

  private navigate() {
    this._router.navigate(['/login']);
  }
}
