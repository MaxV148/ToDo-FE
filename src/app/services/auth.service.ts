import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTE } from '../utils';
import { catchError, shareReplay, tap, throwError } from 'rxjs';
import { ShareUser, User } from 'src/models/models';

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

  getAllUsers() {
    return this.http.get<ShareUser[]>(API_ROUTE + "/users")
  }



}
