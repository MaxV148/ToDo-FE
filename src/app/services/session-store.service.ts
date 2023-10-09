import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { User } from 'src/models/models';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class SessionStoreService {

  constructor() { }

  clear() {
    window.sessionStorage.clear()
  }
  public saveUser(user: User) {
    window.sessionStorage.removeItem(USER_KEY)
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user))
  }


  public getUser(): User | null {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }

  public isTokenValid(): boolean {
    const user = this.getUser()
    if (user) {
      const currentTime = Math.floor(Date.now()/1000)
      const expiresAt = (this.getUser()as any)['expires-at']
      return expiresAt > currentTime
    }
    return false

  }
}
