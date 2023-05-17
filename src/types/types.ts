export interface IMessage {
  id: string;
  message: string;
  received: boolean;
}

export interface ICreateMessage {
  chatId: string;
  message: string;
}

export interface ISendMessageResponse {
  idMessage: string;
}

export interface IConfig {
  method: string;
  headers: {
    'Content-Type'?: string;
  };
  body?: string;
}

export type LoginFormValues = {
  idInstance: string;
  apiTokenInstance: string;
};

export type CreateChatForm = {
  phoneNumber: string;
};
