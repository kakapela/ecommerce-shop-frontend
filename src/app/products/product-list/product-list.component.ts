import { Component, OnInit } from '@angular/core';
import {ProductService} from "../shared/services/product.service";
import {Product} from "../shared/models/product";
import {NotificationType} from "../../enum/notification-type";
import {NotificationService} from "../../shared/notification.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  page = 1;
  products: Product[] = [];
  count = 0;
  pageSize = 16;

  productCategory: string = null;

  constructor(private productService: ProductService, private notificationService: NotificationService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.route.queryParams
     .subscribe((params: Params) => {
        this.productCategory = params['categoryName'];
       });
    this.getProducts();
  }

  getRequestParams(page: number, category: string):any{
    let params: any = {};

    if(page) {
      params[`page`] = page - 1;
    }

    if(category){
      params[`category`] = category;
    }

    return params;
  }

  getProducts(): void {
    this.productService.getAllProductsPaginated(this.getRequestParams(this.page, this.productCategory))
      .subscribe(
        response => {
          const { products, totalItems } = response;
          this.products = products;
          this.count = totalItems;
        },
        error => {
          this.notificationService.notify(NotificationType.ERROR, error.error.message);
        }
        );
  }

  handleProductCategoryChange(category:string): void {
    this.productCategory = category;
    this.page = 1;
    this.getProducts();
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getProducts();
  }

}
