import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;  // ตัวแปรสำหรับเก็บข้อมูลผู้ใช้

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getUserFromLocalStorage();  // ดึงข้อมูลจาก LocalStorage
  }
}
