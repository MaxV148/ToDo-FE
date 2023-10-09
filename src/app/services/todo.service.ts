import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { API_ROUTE } from '../utils';
import { SessionStoreService } from './session-store.service';
import { CreateToDoRequest, ToDo } from 'src/models/models';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Sort } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient, private auth: AuthService, private sessionStore: SessionStoreService) { }
  private _newToDoSub = new BehaviorSubject<ToDo[]>([])
  newToDoSub = this._newToDoSub.asObservable()

  getAllToDosForUser(sortDir: string, sortActive: string) {
    return this.http.get<ToDo[]>(API_ROUTE + "/todos", { params: { "sorting_order": this.buildSorting(sortDir, sortActive) } })
  }
  createToDo(todo: CreateToDoRequest) {
    return this.http.post<ToDo>(API_ROUTE + "/todo", todo)
  }
  toogleToDoStatus(id: number) {
    return this.http.post(API_ROUTE + "/done", { todoId: id })
  }
  updateToDo(id: number, title: string, content: string) {
    return this.http.put(API_ROUTE + "/todo", { todoId: id, title: title, content: content })
  }
  deleteToDo(todoId: number) {
    return this.http.delete(API_ROUTE + "/todo", { params: { "id": todoId } })
  }
  pushNewToDo(todo: ToDo){
    this._newToDoSub.next([todo])
  }

  buildSorting(sortDir: string, sortAct: string) {

    function sortActive(direction: string, active: string) {
      switch (active) {
        case 'title': {
          if (direction === 'asc') {
            return "TITLE_ASC"
          } else {
            return "TITLE_DESC"
          }
        }
        case 'done': {
          if (direction === 'asc') {
            return "DONE_ASC"
          } else {
            return "DONE_DESC"
          }
        }
        case 'category': {
          if (direction === 'asc') {
            return "CATEGORY_ASC"
          } else {
            return "CATEGORY_DESC"
          }
        }
        case 'createdAt': {
          if (direction === 'asc') {
            return "CREATED_AT_ASC"
          } else {
            return "CREATED_AT_DESC"
          }
        }
        case 'author': {
          if (direction === 'asc') {
            return "AUTHOR_ASC"
          } else {
            return "AUTHOR_DESC"
          }
        }
        default: return "TITLE_ASC"
      }

    }
    return sortActive(sortDir, sortAct)
  }
}
