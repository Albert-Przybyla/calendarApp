import { Injectable, inject } from '@angular/core';
import {
  AuthControllerClientService,
  AuthLoginPostRequest,
} from '../../../api-client';
import { TOKEN_KEY } from '../../constants';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = inject(AuthControllerClientService);

  public loginUser(
    login: AuthLoginPostRequest,
    onLogin: (token: any) => void,
    onError: (e: Error) => void
  ) {
    this._auth.authLoginPost(login).subscribe({
      next: (v) => {
        const token = v.token;
        this.setToken(token!);
        onLogin(token);
      },
      error: (e) => {
        onError(e);
      },
    });
  }

  private setToken(userToken: string): void {
    localStorage.setItem(TOKEN_KEY, userToken);
  }

  private removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  public getToken(): string | null {
    let token = localStorage.getItem(TOKEN_KEY);
    if (this.isTokenValid(token!)) return token;
    this.logout();
    return null;
  }

  public getUser(): string | null {
    let token = localStorage.getItem(TOKEN_KEY);
    if (this.isTokenValid(token!)) return token;
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

  private navigate() {}
}
