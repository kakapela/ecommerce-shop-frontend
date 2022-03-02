import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Product} from "../models/product";
import {ProductList} from "../models/product-list";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllProducts(){
    return this.http.get<Array<Product>>(`${this.host}/api/products`);
  }

  getAllProductsPaginated(params: any){
    return this.http.get<ProductList>(`${this.host}/api/products`, {params});
  }

  getProductById(id: number){
    return this.http.get<Product>(`${this.host}/api/products/${id}`);
  }
}
