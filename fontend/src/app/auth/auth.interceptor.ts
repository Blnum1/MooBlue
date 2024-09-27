import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';
import { UserService } from "../services/user.service";


    
    @Injectable()
    export class YourInterceptor implements HttpInterceptor {

        constructor(private userService: UserService){}

        intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            const user = this.userService.currentUser;
            if(user.token)
            {
                req = req.clone({
                    setHeaders:{
                        access_token: user.token
                    }
                })
            }
            
            return next.handle(req);
        }
    }
