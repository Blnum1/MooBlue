import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { Pork } from '../shared/models/Pork';
import { CartItem } from '../shared/models/CartItems';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() { }

  addToCart(pork: Pork): void {
    let cartItem = this.cart.items.find(item => item.pork.id === pork.id);
    
    if (cartItem) {
        // ถ้ารายการมีอยู่ในตะกร้าแล้ว ให้เพิ่มจำนวน
        cartItem.quantity += 1; // เพิ่มจำนวน
        cartItem.price = cartItem.quantity * cartItem.pork.price; // อัปเดตราคา
    } else {
        // ถ้ารายการไม่มีในตะกร้า ให้เพิ่มรายการใหม่
        this.cart.items.push(new CartItem(pork));
    }
    
    this.setCartToLocalStorage(); // อัปเดตสถานะของตะกร้าใน local storage
}

  removeFormCart(porkId: string): void {
    this.cart.items = this.cart.items
    .filter(item => item.pork.id != porkId);
    this.setCartToLocalStorage();
  }

  changeQuantity(porkId:string, quantity: number) {
    let cartItem = this.cart.items
    .find(item => item.pork.id === porkId);
    if(!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.pork.price;
    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }
  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  getCart(): Cart{
    return this.cartSubject.value;
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
