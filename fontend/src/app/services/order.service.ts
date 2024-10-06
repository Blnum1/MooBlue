import { Injectable } from '@angular/core';
import { Order } from '../shared/models/Order';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, ORDERS_URL, ORDER_CREATE_URL, ORDER_NEW_FOR_CURRENT_USER_URL, ORDER_PAY_URL, ORDER_TRACK_URL } from '../shared/models/constants/urls';
import { Observable } from 'rxjs';
import { User } from '../shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = ORDERS_URL; // Base URL for order-related API endpoints

  constructor(private http: HttpClient) {}

  // Create a new order
  create(order: Order): Observable<Order> {
    return this.http.post<Order>(ORDER_CREATE_URL, order);
  }

  // Get the new order for the current user
  getNewOrderForCurrentUser(): Observable<Order> {
    return this.http.get<Order>(ORDER_NEW_FOR_CURRENT_USER_URL);
  }

  // Pay for an order
  pay(order: Order): Observable<string> {
    return this.http.post<string>(ORDER_PAY_URL, order);
  }

  // Track an order by ID
  trackOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${ORDER_TRACK_URL}${id}`);
  }

  // Get all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${BASE_URL}/api/users`); // Adjust URL as defined
  }

  // Get all orders
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl); // Fetch all orders
  }

  // Get total revenue
  getTotalRevenue(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-revenue`); // Endpoint to be created in Backend
  }

  // Delete an order by ID
  deleteOrder(orderId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${orderId}`);
  }

  getDailySalesData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/daily-sales-data`); // คืนค่าข้อมูลในรูปแบบ array
}

getMonthlySalesData(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/monthly-sales-data`);
}

  // In order.service.ts

getTopTags(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/top-tags`);
}

}
