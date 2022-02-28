import {
  ChatActionTypes, ChatAction
} from './chat.actions';
import { WorldState } from '../world-state';
import { IChatHistory } from 'src/model/ChatMessage';

export interface ChatState {
  chatHistory: IChatHistory[],
  currentAction: {
    text: string,
    type: string,
  }
}

export const initialState: ChatState = {
  chatHistory: [],
  currentAction: null,
};

export function chatReducer(state = initialState, action: ChatAction) {

  switch (action.type) {

    case (ChatActionTypes.AddToHisotry):
      return {
        ...state,
        chatHistory: [...state.chatHistory, action.payload]
      };

    default:
      return state;
  }
}

export const getChatHistory = (state: WorldState) => state.chat.chatHistory;
