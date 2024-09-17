import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/models/interfaces/IUserLogin';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/models/constants/urls';
import { ToastrService } from 'ngx-toastr';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserTocalStorage());
  public userObservable:Observable<User>;
  constructor(private http:HttpClient, private toastrService:ToastrService) {
    this.userObservable = this.userSubject.asObservable();
   }

   login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) =>{
          this.setUserTocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Porkmine ${user.name}!`,
            'Login Successful'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        }
      })
    );
   }

   private setUserTocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
   }

   private getUserTocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;

    return new User();
   }
}
