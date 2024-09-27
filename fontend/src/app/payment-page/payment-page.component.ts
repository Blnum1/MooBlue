import { Component, OnInit} from '@angular/core';
import { Order } from '../shared/models/Order';
import { OrderService } from '../services/order.service';
import { Router } from'@angular/router';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent implements OnInit{

  order:Order = new Order();
  constructor(orderService: OrderService, router: Router){
    orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        this.order = order;
      },
      error:() => {
        router.navigateByUrl('/checkcout');
        }
    })
  }

  ngOnInit(): void {
  
  }

}
