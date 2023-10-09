import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SessionStoreService } from 'src/app/services/session-store.service';


@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.scss']
})
export class RegisterformComponent {
  constructor(private authService: AuthService,private router: Router, private activatedRoute: ActivatedRoute,private storeService: SessionStoreService){}
  private fb = inject(FormBuilder);
  registerForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  });

 
  onSubmit(): void {
    if (this.registerForm.valid){
      const username = this.registerForm.value.username!;
      const password = this.registerForm.value.password!;
      this.authService.register(username,password).subscribe({next: data => {
        this.storeService.saveToken(data.token)
        this.storeService.saveUser(data)
        this.router.navigate([""], { relativeTo: this.activatedRoute })
      },error: err => {
        console.log(err)
      }})

    }

  }
}
