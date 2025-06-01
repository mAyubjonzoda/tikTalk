import { ChatWSMessage } from './chat-ws-message.interface';
import {
  ChatConnectionWSParams,
  ChatWSService,
} from './chat-ws-service.interface';
import { Chat, Message, LastMessageRes } from './chats.interface';
import { isUnreadMessage } from './type.guard';

export type {
  Chat,
  Message,
  LastMessageRes,
  ChatWSService,
  ChatConnectionWSParams,
  ChatWSMessage,
};
export { isUnreadMessage };
