import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { BehaviorSubject, map, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()

export class AuthGuard implements CanActivate {
    redirected=  new BehaviorSubject<boolean>(false);
    constructor(private authServ: AuthService, private router :Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authServ.user.pipe(
            take(1),
            map(user => {
            const isAuth = !!user;
            if (isAuth) {
                this.redirected.next(false);
                return true;
            } else {
                this.redirected.next(true);
                return this.router.createUrlTree(['/signin']);
            }
        }))
    }
}