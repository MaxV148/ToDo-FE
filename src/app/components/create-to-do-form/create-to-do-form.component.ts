import { DataSource } from '@angular/cdk/collections';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from 'src/app/services/category.service';
import { TodoService } from 'src/app/services/todo.service';
import { Category, CreateToDoRequest } from 'src/models/models';
import { TodoTableDataSource } from '../todo-table/todo-table-datasource';
import { tap } from 'rxjs';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'create-catetory-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, ReactiveFormsModule],
})
export class DialogOverviewExampleDialog {
  private fb = inject(FormBuilder);
  createCategoryForm = this.fb.group({
    name: [null, Validators.required]
  })
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private categoryService: CategoryService
  ) { }

  onSubmitCategory() {
    if (this.createCategoryForm.valid) {
      const name = this.createCategoryForm.value.name!;
      this.categoryService.createCategory(name).subscribe({
        next: category => {
          this.categoryService.pushNewCategory(category)
          this.dialogRef.close()
        }
      })
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}



@Component({
  selector: 'app-create-to-do-form',
  templateUrl: './create-to-do-form.component.html',
  styleUrls: ['./create-to-do-form.component.scss']
})
export class CreateToDoFormComponent implements OnInit {


  constructor(private categoryService: CategoryService, private todoService: TodoService, public dialog: MatDialog) { }
  public categories: Category[] = []
  dataSource!: TodoTableDataSource;
  

  private fb = inject(FormBuilder);
  createToDoForm = this.fb.group({
    title: ["", Validators.required],
    content: ["", Validators.required],
    category: [null, Validators.required]
  });
  ngOnInit(): void {
    this.categoryService.categorySub.pipe(tap(
      ()=> {
        this.categoryService.getAllCategoriesForUser().subscribe({
          next: categoires => {
            this.categories.push(...categoires)
          }
        })
      }
    )).subscribe()
    this.categoryService.getAllCategoriesForUser().subscribe({
      next: data => {
        this.categories.push(...data)
      }, error: err => {
        console.log("ERROR: ", err)
      }
    })
  }

  onSubmit() {
    if (this.createToDoForm.valid) {
      const title = this.createToDoForm.value.title!;
      const content = this.createToDoForm.value.content!;
      const categoryId = this.createToDoForm.value.category!;
      const req: CreateToDoRequest = {
        title: title,
        content: content,
        category: categoryId
      }
      this.todoService.createToDo(req).subscribe({next: todo => {
        this.todoService.pushNewToDo(todo)
      }})
      
      //reset form
      this.createToDoForm.reset()
      Object.keys(this.createToDoForm.controls).forEach((key) => {
        const control = (this.createToDoForm.controls as any)[key];
        control.markAsPristine();
        control.markAsUntouched();

        control.setErrors(null)
        
    });
      
      

    }

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { name: "", animal: "" },
    });

  }
}
