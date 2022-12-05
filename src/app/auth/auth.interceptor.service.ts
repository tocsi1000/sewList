import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs";
import { FabricsService } from "../fabrics/fabrics.service";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authServ:AuthService, private fabserv:FabricsService){}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authServ.user.pipe(
            take(1),
            exhaustMap(user => {
                if (!user ) {
                    return next.handle(req);
                } else {
                const modifiedReq= req.clone({params: new HttpParams().set('auth', user.token)}) 
                return next.handle(modifiedReq);
            }
            })
        )
        
    }
}