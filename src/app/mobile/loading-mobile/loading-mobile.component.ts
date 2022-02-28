import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading-mobile',
  templateUrl: './loading-mobile.component.html',
  styleUrls: ['./loading-mobile.component.css']
})
export class LoadingMobileComponent implements OnInit {

  private timer = null;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.timer = setInterval(() => {
      this.router.navigate(["/mobile/video"]);
    },2000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }


}
