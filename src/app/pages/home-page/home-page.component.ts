import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStoreService } from 'src/app/services/session-store.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  currentUser: string| undefined

  constructor(private authservice: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private sessionStore: SessionStoreService) { 
    this.currentUser = sessionStore.getUser()?.username
  }

  logout() {
    this.authservice.logout()
    this.router.navigate(["login"], { relativeTo: this.activatedRoute })
    this.sessionStore.clear()


  }

}
