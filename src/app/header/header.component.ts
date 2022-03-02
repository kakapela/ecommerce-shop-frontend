import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {ShoppingCartService} from "../shopping-cart/shared/services/shopping-cart.service";
import {OrderProduct} from "../shared/models/order.product";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isHomePage: boolean = true;

  totalCartValue: number = 0;
  orderProductList: OrderProduct[] = [];
  private shoppingCartSubscription: Subscription;

  constructor(private router: Router,
              private shoppingCartService: ShoppingCartService) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((route) => {
      if (route instanceof NavigationEnd) {
        this.isHomePage = route.url.slice(1) == '';
      }
    });

    this.orderProductList = this.shoppingCartService.getAll();
    if (this.orderProductList !== null) {
      this.totalCartValue = this.orderProductList
        .map(element => element.product.price * element.quantity)
        .reduce((sum, current) => sum + current, 0);
    }
    this.shoppingCartSubscription = this.shoppingCartService.subject.subscribe((data) => {
      this.orderProductList = data;
      console.log('Shopping cart subscription:');
      this.totalCartValue = this.orderProductList
        .map(element => element.product.price * element.quantity)
        .reduce((sum, current) => sum + current, 0)
    });
  }

  ngOnDestroy() {
    this.shoppingCartSubscription.unsubscribe();
  }
}
