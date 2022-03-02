import {Injectable} from '@angular/core';
import {NotificationService} from "../../../shared/notification.service";
import {NotificationType} from "../../../enum/notification-type";
import {OrderProduct} from "../../../shared/models/order.product";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private notificationService: NotificationService) {
  }
  productList: OrderProduct[] = [];
  subject = new Subject<any>();

  addToCart(currentOrderProduct: OrderProduct) {

    if (localStorage.getItem('cart') == null) {
      this.productList = [];
      this.productList.push(currentOrderProduct);
      localStorage.setItem('cart', JSON.stringify(this.productList));
      this.notificationService.notify(NotificationType.SUCCESS, 'Produkt został dodany do koszyka.');
    } else {

      this.productList = JSON.parse(localStorage.getItem('cart'));
      let productIsInCart = false;

      for (let element of this.productList) {
        if (currentOrderProduct.product.id === element.product.id) {
          productIsInCart = true;
          if (currentOrderProduct.quantity !== element.quantity) {
            element.quantity = currentOrderProduct.quantity;
            localStorage.setItem('cart', JSON.stringify(this.productList));
            this.notificationService.notify(NotificationType.WARNING, 'Produkt został zaktualizowany.');
            break;
          } else {
            this.notificationService.notify(NotificationType.INFO, 'Ten produkt znajduje się już w koszyku.');
            break;
          }
        }
      }
      if (!productIsInCart) {
        this.productList.push(currentOrderProduct);
        localStorage.setItem('cart', JSON.stringify(this.productList));
        this.notificationService.notify(NotificationType.SUCCESS, 'Produkt został dodany do koszyka.');
      }
    }
    this.subject.next(this.productList);
  }

  removeFromCart(orderProduct: OrderProduct){
    const index = this.productList.indexOf(orderProduct);
    this.productList.splice(index,1);
    localStorage.setItem('cart', JSON.stringify(this.productList));
    this.notificationService.notify(NotificationType.SUCCESS, 'Produkt został usunięty z koszyka.');
    this.subject.next(this.productList);
  }

  getAll(): OrderProduct[]{
    return JSON.parse(localStorage.getItem('cart'));
  }
}
