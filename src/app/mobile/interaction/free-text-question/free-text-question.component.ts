import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-free-text-question',
  templateUrl: './free-text-question.component.html',
  styleUrls: ['./free-text-question.component.css']
})
export class FreeTextQuestionComponent implements OnInit {
  @Input() question: any;
  @Output() answer = new EventEmitter<any>();

  input: string = "";

  constructor() { }

  ngOnInit() {
  }

  nextAction(){
    if (this.input.length > 2) {
      // console.log(this.input)

      this.answer.emit(this.input);
    }
  }

}
