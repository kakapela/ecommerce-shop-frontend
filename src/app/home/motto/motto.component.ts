import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-motto',
  templateUrl: './motto.component.html',
  styleUrls: ['./motto.component.css']
})

export class MottoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(".rotate").textrotator({
      animation: "dissolve", // You can pick the way it animates when rotating through words. Options are dissolve (default), fade, flip, flipUp, flipCube, flipCubeUp and spin.
      separator: ",", // If you don't want commas to be the separator, you can define a new separator (|, &, * etc.) by yourself using this field.
      speed: 6000 // How many milliseconds until the next word show.
    });
  }

}
