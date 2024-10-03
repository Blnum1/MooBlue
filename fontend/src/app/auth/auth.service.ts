import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';  // เปลี่ยน URL ให้เป็น backend ของคุณ

  constructor(private http: HttpClient) {}

  // ฟังก์ชัน login สำหรับผู้ใช้
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<{ token: string, isAdmin: boolean }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);  // เก็บ token ใน LocalStorage
        localStorage.setItem('isAdmin', response.isAdmin ? 'true' : 'false');  // เก็บ isAdmin role
      })
    );
  }

  // ตรวจสอบ role ของผู้ใช้
  getIsAdmin(): boolean {
    return localStorage.getItem('isAdmin') === 'true';  // เช็คว่าผู้ใช้เป็น admin หรือไม่
  }

  // ฟังก์ชัน logout ลบข้อมูล token
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
  }

  // ฟังก์ชันดึง token ออกจาก LocalStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
