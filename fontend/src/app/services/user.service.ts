import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/models/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BASE_URL, USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/models/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/models/interfaces/IUserRegister';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;
  
  constructor(
    private http: HttpClient, 
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User {
    return this.userSubject.value;
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome to Porkmine ${user.name}!`, 'Login Successful');

          if (user.isAdmin) {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/home']);
          }
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        }
      })
    );
  }

  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome to FrozenPork ${user.name}`, 'Register Successful');

          if (user.isAdmin) {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/home']);
          }
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Register Failed');
        }
      })
    );
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUserFromLocalStorage(): User {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userJson = localStorage.getItem(USER_KEY);
      if (userJson) return JSON.parse(userJson) as User;
    }
    return new User();
}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${BASE_URL}/api/users`);
  }

  updateUserProfile(user: any): Observable<any> {
    return this.http.put<any>(`${BASE_URL}/api/users/profile`, user);  // ส่งข้อมูลไปยัง API เพื่อทำการอัปเดต
  }
}
