import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']  // Fixed typo: changed styleUrl to styleUrls
})
export class HeaderComponent implements OnInit {

  user!:User;
  constructor(private userService:UserService){

    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }

  
  ngOnInit(): void {
  }

  logout(){
    this.userService.logout();
  }

  get isAuth(){
    return this.user.token;
  }
}
