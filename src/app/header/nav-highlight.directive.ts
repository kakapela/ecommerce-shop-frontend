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

  constructor(private route: ActivatedRoute) { }

  @HostListener('window:scroll') onScroll(eventData: Event) {
console.log(this.isHomePage);

    if(this.isHomePage)
    {
      if(window.pageYOffset >= 80) {
        this.bgDark= true;
        this.bgTransparent = false;
      }

    }
    // this.backgroundColor = window.pageYOffset >= 80 ? 'rgba(34, 34, 34, 0.9) !important' : 'transparent !important';
  }

}
