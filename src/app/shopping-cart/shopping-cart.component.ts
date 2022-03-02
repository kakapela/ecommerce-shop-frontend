import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from "./shared/services/shopping-cart.service";
import {OrderProduct} from "../shared/models/order.product";
import {Product} from "../products/shared/models/product";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  orderProducts: OrderProduct[] = [];
  totalCartValue: number = 0.00;
  orderProduct: OrderProduct;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.orderProducts = this.shoppingCartService.getAll();
    this.calculateTotalCartValue();

  }

  calculateTotalCartValue(){
    if (this.orderProducts !== null) {
      this.totalCartValue = this.orderProducts
        .map(element => element.product.price * element.quantity)
        .reduce((sum, current) => sum + current, 0);
    }
  }

  addToCart(product: Product, quantity: string) {
    this.orderProduct = {
      product: product,
      quantity: +quantity
    };
    this.shoppingCartService.addToCart(this.orderProduct);
  }

  removeItemFromCart(orderProduct: OrderProduct) {
    console.log('working!');
    this.shoppingCartService.removeFromCart(orderProduct);
    this.orderProducts = this.shoppingCartService.getAll();
    this.calculateTotalCartValue();
  }
}
