import { useState } from 'react';
import './Chat.scss';
import { sendMessage } from '../../utils/api';
import { ICreateMessage, IMessage } from '../../types/types';

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
      await sendMessage(messageData);

      setMessages([
        ...messages,
        {
          chatId: `${phoneNumber}@c.us`,
          message,
          received: false,
        },
      ]);
      setMessage('');
      console.log(messages);
    } catch (err) {
      console.error('Failed to send the message: ', err);
    }
  };

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
              <div>{message.chatId}</div>
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
