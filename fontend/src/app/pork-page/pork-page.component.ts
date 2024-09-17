import { Component, OnInit } from '@angular/core';
import { Pork } from '../shared/models/Pork';
import { ActivatedRoute, Router } from '@angular/router';
import { PorkService } from '../services/pork.service';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-pork-page',
  templateUrl: './pork-page.component.html',
  styleUrl: './pork-page.component.css'
})
export class PorkPageComponent implements OnInit {

  pork!: Pork;
  constructor(activtedRoute:ActivatedRoute, porkService:PorkService,
    private cartService:CartService, private router: Router) {
    activtedRoute.params.subscribe((params) => {
      if(params.id)
        this.pork = porkService.getPorkById(params.id);
    })
   }



ngOnInit(): void {
}

addToCart(){
    this.cartService.addToCart(this.pork);
    this.router.navigateByUrl('/cart-page');
  }
}