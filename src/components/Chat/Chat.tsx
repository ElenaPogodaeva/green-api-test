import { useEffect, useState } from 'react';
import './Chat.scss';
import { deleteNotification, receiveNotification, sendMessage } from '../../utils/api';
import { ICreateMessage, IMessage } from '../../types/types';
import { useAppSelector } from '../../hooks/hooks';

type ChatProps = {
  phoneNumber: string;
  onChatExit: () => void;
};

export const Chat = ({ phoneNumber, onChatExit }: ChatProps) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState('');
  const { idInstance, apiTokenInstance } = useAppSelector((state) => state.auth);

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
      if (receivedMessage) {
        if (receivedMessage.body.messageData?.typeMessage === 'textMessage') {
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
        }
        const receiptId = receivedMessage.receiptId;
        await deleteNotification(idInstance, apiTokenInstance, receiptId);
      }
    } catch (err) {
      console.error('Failed to receive the message: ', err);
    }
  };

  useEffect(() => {
    const interval = setInterval(receiveMessage, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="nav-bar">
        <span>{phoneNumber}</span>
        <button type="button" className="btn chat-btn" onClick={onChatExit}>
          Покинуть чат
        </button>
      </div>
      <div className="chat">
        <ul className="chat-list">
          {Boolean(messages.length) &&
            messages.map((message, index) => (
              <li key={index} className={'message ' + (message.received ? 'received' : 'sent')}>
                <div>{message.message}</div>
              </li>
            ))}
        </ul>
        <form className="send-message-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={message}
            onChange={handleChange}
            placeholder="Напишите сообщение и нажмите enter"
          />
        </form>
      </div>
    </>
  );
};

export default Chat;
