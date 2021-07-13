import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('modalButton') modalButton: ElementRef;
  mainImagePath: string;

  constructor() { }

  ngOnInit(): void {
      this.mainImagePath = 'assets/images/shop/single-product/single1.jpg';
  }

  onChangeImage(event: any) {
    this.mainImagePath = event.target.src;
  }

  showMainImage() {
    console.log('showMainImage');
    this.modalButton.nativeElement.click();
  }
}
