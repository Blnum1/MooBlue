import { Injectable } from '@angular/core';
import { Order } from '../shared/models/Order';
import { HttpClient } from '@angular/common/http';
import {  BASE_URL, ORDERS_URL, ORDER_CREATE_URL, ORDER_NEW_FOR_CURRENT_USER_URL, ORDER_PAY_URL, ORDER_TRACK_URL } from '../shared/models/constants/urls';
import { Observable } from 'rxjs';
import { User } from '../shared/models/User';




@Injectable({
  providedIn: 'root'
})

export class OrderService {
 
  constructor(private http: HttpClient) { }
  
  create(order:Order){
    return this.http.post<Order>(ORDER_CREATE_URL, order);
  }

  getNewOrderForCurrentUser():Observable<Order>{
    return this.http.get<Order>(ORDER_NEW_FOR_CURRENT_USER_URL);
  }

  pay(order:Order):Observable<string>{
    return this.http.post<string>(ORDER_PAY_URL,order);
  }

  trackOrderById(id:number): Observable<Order>{
    return this.http.get<Order>(ORDER_TRACK_URL + id);
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${BASE_URL}/api/users`); // เปลี่ยน URL ตามที่คุณกำหนด
  }
  
  // OrderService
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(ORDERS_URL); // ดึงข้อมูลคำสั่งทั้งหมด
  }
  
  getTotalRevenue(): Observable<number> {
    return this.http.get<number>(`${ORDERS_URL}/total-revenue`); // Endpoint ที่คุณต้องสร้างใน Backend
  }
}
