import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTE } from '../utils';
import { catchError, shareReplay, tap, throwError } from 'rxjs';
import { ShareUser, User } from 'src/models/models';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  login(username: string, password: string) {
    return this.http.post<User>(API_ROUTE + "/login", { "username": username, "password": password })
  }
  register(username: string, password: string) {
    return this.http.post<User>(API_ROUTE + "/register", { username: username, password: password })
  }
  session(authres: User) {
    const expires_at = moment().add(authres.expiresat, 'second')
    localStorage.setItem("token", authres.token)
    localStorage.setItem("expires_at", JSON.stringify(expires_at.valueOf()))
  }

  shareToDo(userToShare: number, todoForShare: number) {
    return this.http.post(API_ROUTE + "/permissions", { "userToGrand": userToShare, "ToDoForGrand": todoForShare })
  }

  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("expires_at")
  }

  getToken() {
    return localStorage.getItem("token")
  }
  isLoggedIn() {
    return moment().isBefore(this.getExpiration())
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration || "");
    return moment(expiresAt);
  }

  getAllUsers() {
    return this.http.get<ShareUser[]>(API_ROUTE + "/users")
  }



}
