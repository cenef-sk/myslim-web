export interface IChatMessage {
  time: Date,
  user: string,
  text: string,
  kind: string
}

export class ChatMessage implements IChatMessage{
  time: Date;
  user: string;
  text: string;
  kind: string;

  constructor(time: Date, user: string, text: string, kind: string){
    this.time = time;
    this.user = user;
    this.text = text;
    this.kind = kind;
  }
}

export interface IChatHistory extends Array<IChatMessage>{}
