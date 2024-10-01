import { Component, OnInit } from '@angular/core';
import { Order } from '../../shared/models/Order';
import { OrderService } from '../../services/order.service';


@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe(orders => {
      this.orders = orders;
    });
  }
}
