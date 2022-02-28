import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { from, of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
import { concatMap } from 'rxjs/internal/operators';
import { Globals } from '../../../globals';
import { render } from 'src/utils/rendering';

@Component({
  selector: 'app-button-question',
  templateUrl: './button-question.component.html',
  styleUrls: ['./button-question.component.css']
})
export class ButtonQuestionComponent implements OnInit {
  @Input() question: string[];
  @Output() answer = new EventEmitter<any>();

  showButtons: boolean = false;

  constructor(private globals: Globals) {
    console.log(this.question)
  }

  ngOnInit() {
    console.log(this.question)
    console.log("REND")
    // if (this.question.getDelay()) {
    //   from(["EMIT"]).pipe(
    //     delay( this.question.getDelay() )
    //   ).subscribe ( timedItem => {
    //     this.showButtons = true;
    //   });
    // } else {
    //   this.showButtons = true;
    // }

  }
  ngOnChanges() {
  //   if (this.question.getDelay()) {
  //     this.showButtons = false;
  //     from(["EMIT"]).pipe(
  //       delay( this.question.getDelay() )
  //     ).subscribe ( timedItem => {
  //       this.showButtons = true;
  //     });
  //   } else {
      this.showButtons = true;
  //   }
  }

  click(value: number) {
    console.log(value)
    this.answer.emit(value);
  }

  // renderText(text) {
  //   console.log(this.globals.world)
  //   return render(text, this.globals.world);
  // }
}
