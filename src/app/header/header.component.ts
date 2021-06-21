import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isHomePage: boolean = true;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.url.subscribe( url => {
      this.isHomePage = url[0].path === '';
    });
  }

}
