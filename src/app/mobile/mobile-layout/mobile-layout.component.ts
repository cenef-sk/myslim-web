import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-mobile-layout',
  templateUrl: './mobile-layout.component.html',
  styleUrls: ['./mobile-layout.component.css']
})
export class MobileLayoutComponent implements OnInit {
  public time = null;
  private timer = null;

  constructor(
    private router: Router,
    private globals: Globals,
  ) {
    this.setTime();
  }

  ngOnInit() {
    // document.body.style.backgroundColor = "black";

    if(!this.globals.world.participant || !this.globals.world.participant._id) {
      this.router.navigate(['/']);
    }
    this.timer = setInterval(() => {
      this.setTime();
    },1000);
  }

  ngOnDestroy() {
    // document.body.style.backgroundColor = "white";
    clearInterval(this.timer);
  }

  setTime() {
    var d = new Date();

    this.time = this.pad(d.getHours(),2) + ":" +  this.pad(d.getMinutes(),2) + ":" +this.pad(d.getSeconds(),2);
  }
  pad(num, size){     return ('000000000' + num).substr(-size); }
}
