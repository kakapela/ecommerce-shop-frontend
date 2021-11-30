import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ProductsComponent} from "../products/products.component";
import {ProductModel} from "../products/product-model";
import {ProductListModel} from "../products/product-list-model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllProducts(){
    return this.http.get<Array<ProductModel>>(`${this.host}/api/products`);
  }

  getAllProductsPaginated(params: any){
    return this.http.get<ProductListModel>(`${this.host}/api/products`, {params});
  }
}
