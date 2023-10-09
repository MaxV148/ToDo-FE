import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AuthGuardService } from './services/auth.guard.service';

const routes: Routes = [
  {
    path: "",
    component: HomePageComponent,
    canActivate:[AuthGuardService]
  },
  {path: "login", component: LoginPageComponent},
  {path: "register", component: RegisterPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
