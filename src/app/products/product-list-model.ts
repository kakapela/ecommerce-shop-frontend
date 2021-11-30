import {ProductModel} from "./product-model";

export class ProductListModel {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  products: ProductModel[];
}
