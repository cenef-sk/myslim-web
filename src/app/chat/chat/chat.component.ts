import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { WorldState } from 'src/app/world-state';
import { getChatHistory } from '../chat.reducers';
import { ChatAddToHistory } from '../chat.actions';
import { ChatMessage } from 'src/model/ChatMessage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public chatHistory = []
  private actions = 0
  private currentAction = {
    kind: "text",
  }

  constructor(
    private store: Store<WorldState>,
  ) {}

  ngOnInit() {
    this.store.select(getChatHistory).subscribe(data => {
      this.chatHistory = data;
      console.log(data)
    })
  }
  send(){
    this.store.dispatch(new ChatAddToHistory(new ChatMessage(null, null, "test", null)))
  }
}
