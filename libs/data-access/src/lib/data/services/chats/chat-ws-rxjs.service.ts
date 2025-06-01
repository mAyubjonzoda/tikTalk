import { Injectable } from '@angular/core';
import {
  ChatConnectionWSParams,
  ChatWSMessage,
  ChatWSService,
} from '@tt/interfaces/chats';
import { finalize, Observable, tap } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable()
export class ChatWSRxjsService implements ChatWSService {
  private socket: WebSocketSubject<ChatWSMessage> | null = null;

  connect(params: ChatConnectionWSParams): Observable<ChatWSMessage> {
    if (!this.socket) {
      this.socket = webSocket({
        url: params.url,
        protocol: [params.token],
      });
    }

    return this.socket.asObservable().pipe(
      tap((message) => params.handleMessage(message)),
      finalize(() => console.log('socket closed'))
    );
  }
  disconnect(): void {
    this.socket?.complete();
  }
  sendMessage(text: string, chatId: number): void {
    this.socket?.next({
      text,
      chat_id: chatId,
    });
  }
}
