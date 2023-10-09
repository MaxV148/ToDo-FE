import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, catchError, shareReplay, tap, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SessionStoreService } from 'src/app/services/session-store.service';


@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.scss']
})
export class LoginformComponent {
  private fb = inject(FormBuilder);
  invalidLogin = false
  addressForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private storeService: SessionStoreService) { }

  hasUnitNumber = false;


  onSubmit(): void {
    const user = this.addressForm.value.username!
    const password = this.addressForm.value.password!
/*     this.authService.login(user, password).pipe(catchError((error) => {
      if (error.status == 401) {
        this.invalidLogin = true
      }
      return EMPTY
    }), tap(() => {
      this.authService.login
      this.router.navigate([""], { relativeTo: this.activatedRoute })
    }), shareReplay()).subscribe() */
    this.authService.login(user, password).subscribe({next: data => {
      this.storeService.saveUser(data)
      this.storeService.saveToken(data.token)
      this.router.navigate([""], { relativeTo: this.activatedRoute })
    }, error: _ => {
      this.invalidLogin = true
    }})
  }
}
