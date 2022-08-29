import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  public newMessage = false;
  public timer = null;

  constructor(
    private router: Router,
    public translate: TranslateService,
  ) { }

  ngOnInit() {
    this.timer = setInterval(() => {
      this.newMessage = true;
      clearInterval(this.timer);
    },10000);
  }

  goToMessage() {
    this.router.navigate(["/mobile"]);
  }

}
