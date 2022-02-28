export class Message {
  sender: string;
  message: string;
  // time: string;

  constructor(sender: string, message: string) {
    this.sender = sender;
    this.message = message;
  }
}
