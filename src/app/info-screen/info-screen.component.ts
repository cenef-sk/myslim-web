import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info-screen',
  templateUrl: './info-screen.component.html',
  styleUrls: ['./info-screen.component.css']
})
export class InfoScreenComponent implements OnInit {
  @Input() world: any;
  @Output() next = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  nextAction(){
    //Some world modification!
    this.next.emit(this.world);
  }
}
