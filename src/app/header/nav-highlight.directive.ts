import {Directive, HostBinding, HostListener, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Directive({
  selector: '[appNavHighlight]'
})
export class NavHighlightDirective {

  @HostBinding('style.backgroundColor') backgroundColor: string;
  @HostBinding('class.bg-dark') bgDark: boolean;
  @HostBinding('class.bg-transparent') bgTransparent: boolean;
  @Input() isHomePage;

  constructor() {
  }

  @HostListener('window:scroll') onScroll() {
    if (this.isHomePage) {
      if (window.pageYOffset >= 80) {
        this.bgTransparent = false;
        this.bgDark = true;
      } else {
        this.bgDark = false;
        this.bgTransparent = true;
      }
    }
  }

}
