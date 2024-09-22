import { Component, OnInit } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { CartService } from '../services/cart.service';
import { CartItem } from '../shared/models/CartItems';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit{
  cart!: Cart;
  constructor(private cartService: CartService) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
  }

  ngOnInit(): void {
    
  }
  removeFormCart(cartItem:CartItem){
    this.cartService.removeFormCart(cartItem.pork.id);
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString, 10); // Specify the radix (base) for parsing
    if (!isNaN(quantity) && quantity > 0) { // Check if quantity is a valid number and greater than 0
      this.cartService.changeQuantity(cartItem.pork.id, quantity);
    } else {
      console.error('Invalid quantity:', quantityInString); // Log error if the input is invalid
      // Optionally, you could set the quantity back to a default value or notify the user
    }
  }
}
