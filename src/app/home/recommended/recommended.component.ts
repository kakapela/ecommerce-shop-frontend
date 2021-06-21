import { Component, OnInit } from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css']
})
export class RecommendedComponent implements OnInit {
  dynamicSlides = [
    {
      id: 1,
      src:'assets/images/shop/recommended/recommended_1.jpg',
      alt:'Side 1',
      title:'Side 1'
    },
    {
      id: 2,
      src:'assets/images/shop/recommended/recommended_2.jpg',
      alt:'Side 2',
      title:'Side 2'
    },
    {
      id: 3,
      src:'assets/images/shop/recommended/recommended_3.jpg',
      alt:'Side 3',
      title:'Side 3'
    },
    {
      id: 4,
      src:'assets/images/shop/recommended/recommended_4.jpg',
      alt:'Side 4',
      title:'Side 4'
    },
    {
      id: 5,
      src:'assets/images/shop/recommended/recommended_5.jpg',
      alt:'Side 5',
      title:'Side 5'
    }
  ]
  constructor() { }
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    margin:40,
    stagePadding: 0,
    autoHeight:true,
    autoWidth:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },
      992: {
        items: 3
      },
      1200: {
        items: 5
      }
    },
    nav: false
  }
  ngOnInit(): void {
  }

}
