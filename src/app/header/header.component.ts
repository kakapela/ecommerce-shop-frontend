import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isHomePage: boolean = true;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {

    this.router.events.subscribe((route) => {
      if(route instanceof NavigationEnd){
        this.isHomePage = route.url.slice(1) == '';
      }
    });



  }

}
