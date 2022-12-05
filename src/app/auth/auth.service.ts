import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";

interface AuthResponseData  {
    kind:string;
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered:boolean
}


@Injectable({providedIn:'root'})
export class  AuthService {
    user= new BehaviorSubject<User>(null);
    userID:string=null;
    private tokenexpTimer:any;

    constructor(private http:HttpClient, 
                private router:Router, 
                ){}

login(email:string, password:string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCjHF8VsDwQIyziLPvyh3iOhNviSEjZU34',
    {email:email,
    password:password,
    returnSecureToken:true})
    .pipe(
        catchError(errorResp=>{
            let errorMessage="An unkown error occured!";
            if (!errorResp.error || !errorResp.error.error) {
                return throwError(errorMessage);
            } 
            switch (errorResp.error.error.message) {
                case 'INVALID_PASSWORD':
                    errorMessage='The password is invalid.';
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage='The email is invalid.';
                    break;
            }
            return throwError(errorMessage);
        }),
        tap(resDataa => {
            this.handleAuth(resDataa.email, resDataa.localId, resDataa.idToken, +resDataa.expiresIn);
        }
        ))
    }

private handleAuth(email:string, userid:string, token:string, expiresin:number){
        const expirationDate = new Date(new Date().getTime() + expiresin*1000)
        const user = new User(email, 
                            userid, 
                            token, 
                            expirationDate);
        this.userID=userid;                  
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        this.autoLogout(expiresin*1000);
}

autoLogout(expirationDuration:number){
    this.tokenexpTimer = setTimeout(()=>{
        this.logout();
    },expirationDuration)
}

logout(){
    this.user.next(null);
    this.userID=null;
    localStorage.removeItem('userData');
    this.router.navigate(['/signin']);
    if (this.tokenexpTimer){
        clearTimeout(this.tokenexpTimer);
    }
    this.tokenexpTimer=null;
}

getLoggedUserID(){
    return this.userID;
}

}