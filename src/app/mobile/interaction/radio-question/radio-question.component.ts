import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-radio-question',
  templateUrl: './radio-question.component.html',
  styleUrls: ['./radio-question.component.css']
})
export class RadioQuestionComponent implements OnInit {
  @Input() question: any;
  @Output() answer = new EventEmitter<any>();

  input: number;

  constructor() { }

  ngOnInit() {
  }

  nextAction(){
    console.log(this.input)

    this.answer.emit(this.input);
  }
}
