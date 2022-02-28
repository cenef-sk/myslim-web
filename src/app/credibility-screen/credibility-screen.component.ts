import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-credibility-screen',
  templateUrl: './credibility-screen.component.html',
  styleUrls: ['./credibility-screen.component.css']
})
export class CredibilityScreenComponent implements OnInit {
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
