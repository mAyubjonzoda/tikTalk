import { ChatWSMessage } from './chat-ws-message.interface';

export interface ChatConnectionWSParams {
  url: string;
  token: string;
  handleMessage: (message: ChatWSMessage) => void;
}
export interface ChatWSService {
  connect(params: ChatConnectionWSParams): void;
  sendMessage(message: string, chatId: number): void;
  disconnect(): void;
}
