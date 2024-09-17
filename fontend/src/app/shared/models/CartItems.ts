import { Pork } from "./Pork";

export class CartItem {
   quantity: number = 1;
   price: number;

   constructor(public pork: Pork) {
     this.price = pork.price; // Initialize 'price' after 'pork' is initialized
   }
}
