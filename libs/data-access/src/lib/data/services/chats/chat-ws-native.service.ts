import { ChatWSService } from '@tt/interfaces/chats';
import { ChatConnectionWSParams } from '@tt/interfaces/chats/';

export class ChatWSNativeService implements ChatWSService {
  private socket: WebSocket | null = null;
  connect(params: ChatConnectionWSParams) {
    if (this.socket) return;
    this.socket = new WebSocket(params.url, [params.token]);

    this.socket.onmessage = (e: MessageEvent) => {
      // TODO Обработка сообщений event.data
      params.handleMessage(JSON.parse(e.data));
    };

    this.socket.onclose = () => {
      console.log('socket closed');
    };
  }
  sendMessage(text: string, chatId: number) {
    this.socket?.send(
      JSON.stringify({
        text,
        chat_id: chatId,
      })
    );
  }
  disconnect() {
    this.socket?.close();
  }
}
