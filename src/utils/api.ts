import { IConfig, ICreateMessage } from '../types/types';
import { baseUrl, idInstance, apiTokenInstance } from './constants';

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

export const sendMessage = (message: ICreateMessage) => {
  const url = `${baseUrl}${idInstance}/SendMessage/${apiTokenInstance}`;
  return createResponse(url, 'POST', message);
};
