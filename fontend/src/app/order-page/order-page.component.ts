import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../shared/models/Order';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {
  orders: Order[] = []; // Array to store the user's orders

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrdersForCurrentUser(); // Fetch the orders on component initialization
  }

  // Method to fetch the orders for the current user
  getOrdersForCurrentUser(): void {
    this.orderService.getOrdersForCurrentUser().subscribe({
      next: (orders) => {
        this.orders = orders; // Set the orders to the retrieved data
      },
      error: (err) => {
        console.error('Failed to fetch orders', err);
      }
    });
  }
}
