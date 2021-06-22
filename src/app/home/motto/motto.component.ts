import {AfterViewInit, Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-motto',
  templateUrl: './motto.component.html',
  styleUrls: ['./motto.component.css'],
  animations: [
    trigger("fadeAnimation", [
      transition("false=>true", [
        style({opacity: 0}),
        animate("500ms", style({opacity: 1}))
      ]),
      //when we write '500ms  5000ms' means that the animation spend 500ms, and start afer 5000ms
      transition("true=>false", [animate("500ms 5000ms", style({opacity: 0}))])
    ])
  ]
})

export class MottoComponent implements OnInit, AfterViewInit {

  mainBanners = ["Promocje aż do -40%", "Odkryj swój własny styl"];
  subBanners = ["Ubieraj się jak chcesz z DaFashion", "Original Fashion Brand Design"];
  wordCounter = -1;
  triggerCarousel: boolean = true;

  constructor() {
  }

  showNextSentence(event: any) {
    this.triggerCarousel = !this.triggerCarousel;
    if (event.fromState)
      this.wordCounter = (this.wordCounter + 1) % this.mainBanners.length;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.triggerCarousel = false;
    })
  }
}
