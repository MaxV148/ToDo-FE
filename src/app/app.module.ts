import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {HttpClientModule} from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {MatDialogModule} from '@angular/material/dialog'; 
import { ReactiveFormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginformComponent } from './components/loginform/loginform.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterformComponent } from './components/registerform/registerform.component';
import { TodoTableComponent } from './components/todo-table/todo-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { httpInterceptorProviders } from './helper/interceptor';

import { CreateToDoFormComponent } from './components/create-to-do-form/create-to-do-form.component';
import { AuthGuardService } from './services/auth.guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginformComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomePageComponent,
    RegisterformComponent,
    TodoTableComponent,
    CreateToDoFormComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatIconModule,
    HttpClientModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [httpInterceptorProviders,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
