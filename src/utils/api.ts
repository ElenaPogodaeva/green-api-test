import { IConfig, ICreateMessage } from '../types/types';
import { baseUrl } from './constants';

async function createResponse(url: string, method: string, data: ICreateMessage | null = null) {
  try {
    const config: IConfig = {
      method,
      headers: {},
    };

    if (data) {
      config.headers['Content-Type'] = 'application/json';
      config.body = JSON.stringify(data);
    }
    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

export const sendMessage = (
  idInstance: string,
  apiTokenInstance: string,
  message: ICreateMessage
) => {
  const url = `${baseUrl}${idInstance}/SendMessage/${apiTokenInstance}`;
  return createResponse(url, 'POST', message);
};

export const receiveNotification = (idInstance: string, apiTokenInstance: string) => {
  const url = `${baseUrl}${idInstance}/ReceiveNotification/${apiTokenInstance}`;
  return createResponse(url, 'GET');
};

export const deleteNotification = (
  idInstance: string,
  apiTokenInstance: string,
  receiptId: string
) => {
  const url = `${baseUrl}${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`;
  return createResponse(url, 'DELETE');
};
