export interface ChatConnectionWSParams {
  url: string;
  token: string;
  handleMessage: (message: any) => void;
}
export interface ChatWSService {
  connect(params: ChatConnectionWSParams): void;
  sendMessage(message: string, chatId: number): void;
  disconnect(): void;
}
