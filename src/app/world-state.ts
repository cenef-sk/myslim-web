import { User } from 'src/model/User';
import {ChatState} from './chat/chat.reducers';

export interface WorldState {
  user: User;
  users: User[];
  chat: ChatState;
}
