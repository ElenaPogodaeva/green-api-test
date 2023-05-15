import './Chat.scss';

const MESSAGES = [
  {
    id: '1',
    text: 'message',
  },
  {
    id: '2',
    text: 'message',
  },
  {
    senderId: '3',
    text: 'message',
  },
  {
    id: '4',
    text: 'message',
  },
  {
    id: '5',
    text: 'message',
  },
];

type ChatProps = {
  phoneNumber: string;
};

export const Chat = ({ phoneNumber }: ChatProps) => {
  return (
    <>
      <div className="nav-bar">
        <span>{phoneNumber}</span>
        <button type="submit" className="">
          Покинуть чат
        </button>
      </div>
      <ul className="chat">
        {Boolean(MESSAGES.length) &&
          MESSAGES.map((message) => (
            <li key={message.id} className="message">
              <div>{message.id}</div>
              <div>{message.text}</div>
            </li>
          ))}
      </ul>
      <form className="send-message-form">
        <input placeholder="Type your message and hit ENTER" type="text" />
      </form>
    </>
  );
};

export default Chat;
