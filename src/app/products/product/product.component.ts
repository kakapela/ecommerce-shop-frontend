import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../shared/services/product.service";
import {Product} from "../shared/models/product";
import {NotificationType} from "../../enum/notification-type";
import {NotificationService} from "../../shared/notification.service";
import {ActivatedRoute, Params} from "@angular/router";
import {ShoppingCartService} from "../../shopping-cart/shared/services/shopping-cart.service";
import {OrderProduct} from "../../shared/models/order.product";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('modalButton') modalButton: ElementRef;
  mainImagePath: string;

  productId: number;
  product: Product = new Product();
  numberOfStars: number = 0;
  orderProduct: OrderProduct;

  constructor(private productService: ProductService,
              private notificationService: NotificationService,
              private route: ActivatedRoute,
              private shoppingCartService: ShoppingCartService) {
  }

  ngOnInit(): void {
      this.route.params
        .subscribe((params:Params)=>{
          this.productId = params['id'];

          this.productService.getProductById(this.productId)
            .subscribe(response=>{
                this.product = response;
                this.mainImagePath = this.product.pictureUrls[0];

                if (this.product.numberOfReviews > 900)
                  this.numberOfStars = 5;
                else if (this.product.numberOfReviews > 850)
                  this.numberOfStars = 4;
                else this.numberOfStars = 3;
              },
              error => {
                this.notificationService.notify(NotificationType.ERROR,  error.error.message);
              }
            );
        });


  }

  onChangeImage(event: any) {
    this.mainImagePath = event.target.src;
  }

  showMainImage() {
    this.modalButton.nativeElement.click();
  }

  addToCart(product: Product, quantity: string) {
    this.orderProduct = {
      product: product,
      quantity: +quantity
    };
    this.shoppingCartService.addToCart(this.orderProduct);
  }

}
