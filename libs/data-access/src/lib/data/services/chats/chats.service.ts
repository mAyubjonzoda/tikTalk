import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  Chat,
  ChatWSMessage,
  ChatWSService,
  isUnreadMessage,
  LastMessageRes,
  Message,
} from '@tt/interfaces/chats';
import { map, Observable } from 'rxjs';
import { ProfileService } from '../profile/profile.service';
import { ChatWSNativeService } from './chat-ws-native.service';
import { AuthService } from '@tt/auth';
import { isNewMessage } from '@tt/interfaces/chats/type.guard';
import { ChatWSRxjsService } from './chat-ws-rxjs.service';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  http = inject(HttpClient);
  me = inject(ProfileService).me;
  auth = inject(AuthService);

  wsAdapter: ChatWSService = new ChatWSRxjsService();
  activeChatMessages = signal<Message[]>([]);

  private url = 'https://icherniakov.ru/yt-course/';
  private chatsUrl = `${this.url}chat/`;
  private messagesUrl = `${this.url}message/`;

  connectWS() {
    return this.wsAdapter.connect({
      url: `${this.chatsUrl}ws`,
      token: this.auth.token ?? '',
      handleMessage: this.handleWSMessage,
    }) as Observable<ChatWSMessage>;
  }
  handleWSMessage = (message: ChatWSMessage) => {
    if (!('action' in message)) return;
    if (isUnreadMessage(message)) {
      //TODO
    }
    if (isNewMessage(message)) {
      this.activeChatMessages.set([
        ...this.activeChatMessages(),
        {
          id: message.data.id,
          userFromId: message.data.author,
          personalChatId: message.data.chat_id,
          text: message.data.message,
          createdAt: message.data.created_at,
          isRead: false,
          isMine: false,
        },
      ]);
    }
  };

  createChat(userId: number) {
    return this.http.post<Chat>(`${this.chatsUrl}${userId}`, {});
  }

  getMyChats() {
    return this.http.get<LastMessageRes[]>(`${this.chatsUrl}get_my_chats/`);
  }

  getChatById(chatId: number) {
    return this.http.get<Chat>(`${this.chatsUrl}${chatId}`).pipe(
      map((chat) => {
        const patchedMessages = chat.messages.map((message) => {
          return {
            ...message,
            user:
              chat.userFirst.id === message.userFromId
                ? chat.userFirst
                : chat.userSecond,
            isMine: message.userFromId === this.me()!.id,
          };
        });

        this.activeChatMessages.set(patchedMessages);
        return {
          ...chat,
          companion:
            chat.userFirst.id === this.me()?.id
              ? chat.userSecond
              : chat.userFirst,
          messages: patchedMessages,
        };
      })
    );
  }

  sendMessage(chatId: number, message: string) {
    return this.http.post<Message>(
      `${this.messagesUrl}send/${chatId}`,
      {},
      {
        params: { message },
      }
    );
  }
}
