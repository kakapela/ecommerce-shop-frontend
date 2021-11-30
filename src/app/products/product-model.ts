import {PictureModel} from "./picture-model";

export class ProductModel {
  id: number;
  name: string;
  price: number;
  currency:string;
  description: string;
  size: number;
  color: string;
  brand: string;
  category: string;
  subcategory: string;
  pictureUrl: string;
  pictureUrls: PictureModel[];
}
