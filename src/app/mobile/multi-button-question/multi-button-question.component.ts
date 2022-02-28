import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Answer } from 'src/model/Answer';

@Component({
  selector: 'app-multi-button-question',
  templateUrl: './multi-button-question.component.html',
  styleUrls: ['./multi-button-question.component.css']
})
export class MultiButtonQuestionComponent implements OnInit {

  @Output() onAnswer: EventEmitter<Answer> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  sendAnswer() {
    this.onAnswer.emit(new Answer("This is my answer", null, null));
  }

}
