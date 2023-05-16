import { useEffect, useState } from 'react';
import './Chat.scss';
import { deleteNotification, receiveNotification, sendMessage } from '../../utils/api';
import { ICreateMessage, IMessage } from '../../types/types';
import { apiTokenInstance, idInstance } from '../../utils/constants';

type ChatProps = {
  phoneNumber: string;
};

export const Chat = ({ phoneNumber }: ChatProps) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setMessage(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const messageData: ICreateMessage = {
        chatId: `${phoneNumber}@c.us`,
        message,
      };
      const { idMessage } = await sendMessage(idInstance, apiTokenInstance, messageData);

      setMessages((prev) => [
        ...prev,
        {
          id: idMessage,
          message,
          received: false,
        },
      ]);
      setMessage('');
    } catch (err) {
      console.error('Failed to send the message: ', err);
    }
  };

  const receiveMessage = async () => {
    try {
      const receivedMessage = await receiveNotification(idInstance, apiTokenInstance);

      if (receivedMessage && receivedMessage.body.messageData?.typeMessage === 'textMessage') {
        const textMessage = receivedMessage.body.messageData.textMessageData.textMessage;

        const idMessage = receivedMessage.body.idMessage;

        setMessages((prev) => [
          ...prev,
          {
            id: idMessage,
            message: textMessage,
            received: true,
          },
        ]);

        const receiptId = receivedMessage.receiptId;

        await deleteNotification(idInstance, apiTokenInstance, receiptId);
      }
    } catch (err) {
      console.error('Failed to receive the message: ', err);
    }
  };

  useEffect(() => {
    const interval = setInterval(receiveMessage, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="nav-bar">
        <span>{phoneNumber}</span>
        <button type="submit" className="">
          Покинуть чат
        </button>
      </div>
      <ul className="chat">
        {Boolean(messages.length) &&
          messages.map((message, index) => (
            <li key={index} className="message">
              <div>{message.id}</div>
              <div>{message.message}</div>
            </li>
          ))}
      </ul>
      <form className="send-message-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Напишите сообщение и нажмите ENTER"
        />
      </form>
    </>
  );
};

export default Chat;
