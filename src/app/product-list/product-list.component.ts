import { Component, OnInit } from '@angular/core';
import {ProductService} from "../shared/product.service";
import {ProductModel} from "../products/product-model";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  page = 1;
  products: ProductModel[] = [];
  count = 0;
  pageSize = 16;
  currentIndex = -1;

  currentProduct: {} = {};

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
   this.getProducts();
  }

  setActiveProduct(product: ProductModel, index: number): void {
    this.currentProduct = product;
    this.currentIndex = index;
  }

  getRequestParams(page: number):any{
    let params: any = {};

    if(page) {
      params[`page`] = page - 1;
    }
    return params;
  }

  getProducts(): void {
    this.productService.getAllProductsPaginated(this.getRequestParams(this.page))
      .subscribe(
        response => {
          const { products, totalItems } = response;
          this.products = products;
          this.count = totalItems;
          console.log(response);
        },
        error => {
          console.log(error);
        }
        );
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getProducts();
  }

}
