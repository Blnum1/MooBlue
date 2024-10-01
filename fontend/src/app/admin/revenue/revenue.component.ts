import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';


@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css']
})
export class RevenueComponent implements OnInit {
  totalRevenue: number = 0;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.calculateTotalRevenue();
  }

  calculateTotalRevenue() {
    this.orderService.getTotalRevenue().subscribe(revenue => {
      this.totalRevenue = revenue;
    });
  }
}
