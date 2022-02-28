export class Activity {
  name: string;
  text: string;
  path: string;
  fileName: string;
  unread: boolean;
  // answerType: string; //buttons, excheckboxes, expcheckboxes, text, textcheckbox, radio
  // answer: any;

  constructor(name, text, path, fileName) {
    this.name = name;
    this.text = text;
    this.path = path;
    this.fileName = fileName;
    this.unread = true;
    // this.answerType = answerType;
    // this.answer = answer;
  }
  read() {
    this.unread = false;
  }
}
