import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-explained-checkboxes-question',
  templateUrl: './explained-checkboxes-question.component.html',
  styleUrls: ['./explained-checkboxes-question.component.css']
})
export class ExplainedCheckboxesQuestionComponent implements OnInit {
  @Input() question: any;
  @Output() answer = new EventEmitter<any>();

  input = [];
  isChecked = false;

  constructor() { }

  ngOnInit() {
    // input
  }

  ngOnChanges() {
    if (this.question) {
      this.input = this.question.answers.map(()=>false);
    } else {
      this.input = [];
    }
  }

  getIsChecked() {
    return this.isChecked;
  }

  checkAction(){
    console.log(this.input)
    this.isChecked = true;
    // this.answer.emit(this.input);
  }

  nextAction(){
    console.log(this.input)
    const correct = this.question.answers.map((item, i) => {
      return(item.correct == this.input[i])
    }).reduce((prev, curr) => {
      if (curr) {
        return (prev + 1);
      }
      return prev
    }, 0)
    const all = this.question.answers.length;
    this.answer.emit([this.input, correct]);
  }
}
