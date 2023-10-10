import { AfterViewInit, Component, Inject, OnInit, ViewChild, inject } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TodoTableDataSource } from './todo-table-datasource';
import { TodoService } from 'src/app/services/todo.service';
import { Category, ShareUser, ToDo, User } from 'src/models/models';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { filter, merge, tap } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser'
import { CategoryService } from 'src/app/services/category.service';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { SessionStoreService } from 'src/app/services/session-store.service';




export interface EditDialogData {
  id: number;
  title: string;
  content: string;
  done: boolean;
  category: number;
  categories: Category[]
  users: ShareUser[];
  dataSource: TodoTableDataSource
}


@Component({
  selector: 'edit-category-dialog',
  templateUrl: 'edit-category-dialog.html',
  standalone: true,
  imports: [MatDialogModule, CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, ReactiveFormsModule, MatSelectModule, MatOptionModule],
})
export class EditCatetoryDialog {

  private fb = inject(FormBuilder);
  errorShare = false

  constructor(
    public dialogRef: MatDialogRef<EditCatetoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EditDialogData,
    private todoService: TodoService,
    private authService: AuthService

  ) {
    
  }

  editCategoryForm = this.fb.group({
    title: new FormControl(this.data.title, Validators.required),
    content: new FormControl(this.data.content, Validators.required),
    category: new FormControl(this.data.category),

  })

  onInvide() {
    const userToShare = this.editCategoryForm.value.category!
    const todoForShare = this.data.id
    this.authService.shareToDo(userToShare, todoForShare).subscribe({
      next: _ => {
        this.dialogRef.close();
      },error: _ =>{
        this.errorShare = true
      } 
    })
  }
  onSubmitEditCategory() {
    if (this.editCategoryForm.valid) {
      const id = this.data.id;
      const title = this.editCategoryForm.value.title!;
      const content = this.editCategoryForm.value.content!;
      const category = this.editCategoryForm.value.category!;
      this.todoService.updateToDo(id, title, content).subscribe({
        next: _ => {
          this.data.dataSource.loadToDos()
          
          this.dialogRef.close()
        }
      })
    }

  }
  onDelete() {
    this.todoService.deleteToDo(this.data.id!).subscribe({
      next: _ => {
        this.data.dataSource.loadToDos()
        this.dialogRef.close()
      }
    })

  }

  onSubmitCategory() {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss']
})
export class TodoTableComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ToDo>;
  dataSource!: TodoTableDataSource;
  private fb = inject(FormBuilder);
  doneForm = this.fb.group({
    done: new FormControl(),
    rowId: new FormControl()
  })


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'content', 'done', 'category', 'createdAt', 'author', 'edit'];
  currentUser: string | undefined;
  constructor(private todoService: TodoService, private categoryService: CategoryService, public dialog: MatDialog, private authService: AuthService, private sesstionService: SessionStoreService) {
    this.currentUser = this.sesstionService.getUser()?.username
  }
  public categories: Category[] = []
  private users: ShareUser[] = []
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;

    merge(this.sort.sortChange, this.todoService.newToDoSub).pipe(
      tap(() => this.dataSource.loadToDos())
    ).subscribe()

  }
  onSlideToggleChange(newValue: any) {
    const todoID = newValue.source.id
    this.todoService.toogleToDoStatus(todoID).subscribe()
  }

  openDialog(row: any) {
    const ref = this.dialog.open(EditCatetoryDialog, {
      data: {
        title: row.Title,
        categories: this.categories,
        done: row.Done,
        content: row.Content,
        category: row.Category,
        id: row.ID,
        users: this.users,
        dataSource: this.dataSource
      }
    })
  }

  ngOnInit(): void {
    this.dataSource = new TodoTableDataSource(this.todoService)
    this.dataSource.loadToDos()
    this.categoryService.getAllCategoriesForUser().subscribe({
      next: data => {
        this.categories.push(...data)
      }, error: err => {
        console.log("ERROR: ", err)
      }
    })
    this.authService.getAllUsers().subscribe({
      next: users => {
        const currentUser = this.sesstionService.getUser()?.username
        
        this.users.push(...users.filter(user => user.Username != currentUser))
      }
    })

  }
}
