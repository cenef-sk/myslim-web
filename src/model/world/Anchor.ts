export class Anchor {
  name: string;
  text: string;
  unread: boolean;
  // answerType: string; //buttons, excheckboxes, expcheckboxes, text, textcheckbox, radio
  // answer: any;

  constructor(name, text) {
    this.name = name;
    this.text = text;
    this.unread = true;
    // this.answerType = answerType;
    // this.answer = answer;
  }
  read() {
    this.unread = false;
  }
}
