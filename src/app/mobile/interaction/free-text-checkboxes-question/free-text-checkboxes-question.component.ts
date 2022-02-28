import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-free-text-checkboxes-question',
  templateUrl: './free-text-checkboxes-question.component.html',
  styleUrls: ['./free-text-checkboxes-question.component.css']
})
export class FreeTextCheckboxesQuestionComponent implements OnInit {
  @Input() question: any;
  @Output() answer = new EventEmitter<any>();

  input = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.question) {
      this.input = this.question.answers.map(()=>[false,""]);
    } else {
      this.input = [];
    }
  }

  nextAction(){
    console.log(this.input)
    const res = this.question.answers.reduce((prev, curr, i) => {
      if (this.input[i][0]) {
        let res = prev;
        if (res.length) {
          res = res + ", " + curr.answer
        } else {
          res = curr.answer
        }
        return(res);
      }
      return (prev);
    }, "");

    this.answer.emit([this.input, res]);
  }
}
