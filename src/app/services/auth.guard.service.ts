import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { SessionStoreService } from "./session-store.service";

@Injectable()
export class AuthGuardService{
    constructor(private authService: AuthService, private router: Router, private sesssionStore: SessionStoreService){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (!this.sesssionStore.isTokenValid()) {
            this.router.navigate(['/login'])
            return false
        }
        return true
    }
}