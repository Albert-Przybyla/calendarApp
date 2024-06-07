import jwt_decode from 'jwt-decode';

export class User {
  id: string;
  email: string;
  token: string;
  username: string;
  private exp: number;

  constructor(token?: string) {
    this.token = token!;
    this.decodeToken();
  }

  public decodeToken() {
    const roleIdentifier: string =
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
    const emailIdentifier: string =
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';

    const credentials: any = jwt_decode(this.token);
    this.id = credentials.id;
    this.email = credentials.email;
    this.username = credentials.suername;
    this.exp = credentials.exp;
  }

  public isTokenActive(): boolean {
    return this.exp > new Date().getTime() / 1000;
    return true;
  }
}
