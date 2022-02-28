import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-screen',
  templateUrl: './upload-screen.component.html',
  styleUrls: ['./upload-screen.component.css']
})
export class UploadScreenComponent implements OnInit {
  @Input() world: any;
  @Output() next = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  nextAction(){
    //Some world modification!
    const world = this.addDocument(this.world)

    this.next.emit(world);
  }

  addDocument(world) {
    return {
       ...world,
       currentDocument: {
         title: null,
         credibility: null,
       }
    };
  }
}
