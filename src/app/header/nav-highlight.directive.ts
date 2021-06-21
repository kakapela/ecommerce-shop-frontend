import {Directive, HostBinding, HostListener} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Directive({
  selector: '[appNavHighlight]'
})
export class NavHighlightDirective {

  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private route: ActivatedRoute) { }

  @HostListener('window:scroll') onScroll(eventData: Event) {
    this.backgroundColor = window.pageYOffset >= 80 ? 'rgba(34, 34, 34, 0.9) !important' : 'transparent !important';
  }

}
