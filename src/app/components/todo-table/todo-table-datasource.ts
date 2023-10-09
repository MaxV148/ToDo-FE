import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { map, retry, tap } from 'rxjs/operators';
import { Observable, of as observableOf, merge, EMPTY, of, BehaviorSubject } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import { ToDo } from 'src/models/models';




/**
 * Data source for the TodoTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TodoTableDataSource extends DataSource<ToDo> {
  data: ToDo[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  private todoSubj = new BehaviorSubject<ToDo[]>([])
  private todoCount = new BehaviorSubject<number>(0)

  constructor(private todoService: TodoService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ToDo[]> {
    
    return this.todoSubj.asObservable()
  }
  loadToDos() {
    this.todoService.getAllToDosForUser(this.sort?.direction!, this.sort?.active!).subscribe({
      next: todos => {
        this.todoSubj.next(todos)
        this.todoCount.next(todos.length)
      }
    })
    
    
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { }




  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ToDo[]): ToDo[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

}