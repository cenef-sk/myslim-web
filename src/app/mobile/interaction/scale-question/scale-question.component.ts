import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-scale-question',
  templateUrl: './scale-question.component.html',
  styleUrls: ['./scale-question.component.css']
})
export class ScaleQuestionComponent implements OnInit {
  @Input() question: any;
  @Output() answer = new EventEmitter<any>();

  input = 5;
  label = "";

  constructor(
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.formatLabel();
  }

  formatLabel() {
  let value = this.input;
  const labels = [
    "dialog.SCALE_1",
    "dialog.SCALE_2",
    "dialog.SCALE_3",
    "dialog.SCALE_4",
    "dialog.SCALE_5",
  ];

  let res;
  switch(true){
    case (value>=9):
      res = labels[4]
      break;
    case (value>=7):
      res = labels[3]
      break;
    case (value>=4):
      res = labels[2]
      break;
    case (value>=2):
      res = labels[1]
      break;
    default:
      res = labels[0]
  }

  this.translate.get(res).subscribe((res: string) => {
      this.label = res;
  });
}

onInputChange(event) {
  this.input = event.value
  this.formatLabel()
}

  nextAction(){
    console.log(this.input)

    this.answer.emit([this.input, this.label]);
  }
}
