import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTE } from '../utils';
import { Category } from 'src/models/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  private _categorySub = new BehaviorSubject<Category[]>([]);
  categorySub = this._categorySub.asObservable() 

  getAllCategoriesForUser() {
    return this.http.get<Category[]>(API_ROUTE + "/categories")
  }

  createCategory(name: string){
    return this.http.post<Category>(API_ROUTE + "/category",{"name":name})
  }
  pushNewCategory(category: Category){
    this._categorySub.next([category])
  }

  


}
