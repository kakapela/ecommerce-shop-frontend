import {Directive, HostBinding, HostListener, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Directive({
  selector: '[appNavHighlight]'
})
export class NavHighlightDirective {

  @HostBinding('style.backgroundColor') backgroundColor: string;
  @Input() isHomePage;

  constructor(private route: ActivatedRoute) { }

  @HostListener('window:scroll') onScroll(eventData: Event) {
    if(this.isHomePage)
    this.backgroundColor = window.pageYOffset >= 80 ? 'rgba(34, 34, 34, 0.9) !important' : 'transparent !important';
  }

}
