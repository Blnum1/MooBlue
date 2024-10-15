import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'; // Adjust this path as necessary
import { User } from '../../shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Fixed typo: styleUrls
})
export class HeaderComponent implements OnInit {

  user!: User;
  isAuth: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Subscribe to user changes and set user and isAuth accordingly
    this.userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
      this.isAuth = !!newUser.token; // If the user has a token, they are authenticated
    });
  }

  // Method to log the user out
  logout() {
    this.userService.logout();
  }

  // Check if the logged-in user is an admin
  get isAdmin() {
    return this.user.isAdmin;
  }
}
