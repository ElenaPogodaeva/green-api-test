import { useState } from 'react';

import Chat from '../../components/Chat/Chat';
import CreateChat from '../../components/CreateChat/CreateChat';

export const Main = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatExit = () => {
    setPhoneNumber('');
    setIsChatOpen(false);
  };

  return (
    <>
      {isChatOpen ? (
        <Chat phoneNumber={phoneNumber} onChatExit={handleChatExit} />
      ) : (
        <CreateChat onPhoneChange={setPhoneNumber} onPhoneSubmit={setIsChatOpen} />
      )}
    </>
  );
};

export default Main;
