import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-expandable-checkboxes-question',
  templateUrl: './expandable-checkboxes-question.component.html',
  styleUrls: ['./expandable-checkboxes-question.component.css']
})
export class ExpandableCheckboxesQuestionComponent implements OnInit {
  @Input() question: any;
  @Output() answer = new EventEmitter<any>();

  input = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.question) {
      this.input = this.question.answers.map(()=>false);
    } else {
      this.input = [];
    }
  }

  nextAction(){
    console.log(this.input)
    const res = this.question.answers.reduce((prev, curr, i) => {
      if (this.input[i]) {
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
