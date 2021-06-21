import {Component, HostBinding, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subject} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isHomePage: boolean = true;
  isHomePageSub = new Subject<boolean>();
  constructor(private route: ActivatedRoute) { }

  @HostListener('window:scroll') onScroll(eventData: Event) {
    console.log(this.backgroundColor);
  }

  @HostBinding('style.backgroundColor') backgroundColor: string;

  ngOnInit(): void {
    this.route.url.subscribe( url => {
      if(url[0].path == '')
      {
        this.isHomePage = true;
        this.isHomePageSub.next(true);
      }
      else {
        this.isHomePage = false;
        this.isHomePageSub.next(false);
      }

    });
  }

}
