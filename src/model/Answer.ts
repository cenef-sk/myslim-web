export class Answer {
  message: string;
  answerType: string; //buttons, excheckboxes, expcheckboxes, text, textcheckbox, radio
  answer: any;

  constructor(message, answerType, answer) {
    this.message = message;
    this.answerType = answerType;
    this.answer = answer;
  }
}
