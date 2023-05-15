export interface IMessage {
  chatId: string;
  message: string;
  received: boolean;
}

export interface ICreateMessage {
  chatId: string;
  message: string;
}

export interface IMessageResponse {
  idMessage: string;
}

export interface IConfig {
  method: string;
  headers: {
    'Content-Type'?: string;
  };
  body?: string;
}
