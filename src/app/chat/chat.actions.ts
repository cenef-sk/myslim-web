import { Action } from '@ngrx/store';

export enum ChatActionTypes {
  AddToHisotry = '[Chat Componet] Add',
}

export class ActionEx implements Action {
  readonly type;
  payload: any;
}


export class ChatAddToHistory implements ActionEx {
  readonly type = ChatActionTypes.AddToHisotry;
  constructor(public payload: any) {
  }
}

export type ChatAction =
  | ChatAddToHistory
