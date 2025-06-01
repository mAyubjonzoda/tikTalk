export interface ChatWSMessageBase {
  status: 'success' | 'error';
}

export interface ChatWSUnreadMessage extends ChatWSMessageBase {
  action: 'unread';
  data: {
    count: number;
  };
}

export interface ChatWSNewMessage extends ChatWSMessageBase {
  action: 'message';
  data: {
    id: number;
    author: number;
    chat_id: number;
    message: string;
    created_at: string;
  };
}

export interface ChatWSError extends ChatWSMessageBase {
  message: string;
}

export interface ChatWSSendMessage {
  text: string;
  chat_id: number;
}

export type ChatWSMessage =
  | ChatWSUnreadMessage
  | ChatWSNewMessage
  | ChatWSError
  | ChatWSSendMessage;
