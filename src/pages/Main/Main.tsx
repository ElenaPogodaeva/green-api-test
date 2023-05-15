import React, { useState } from 'react';
import './Main.scss';

import Chat from '../../components/Chat/Chat';
import CreateChat from '../../components/CreateChat/CreateChat';

export const Main = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {isChatOpen ? (
        <Chat phoneNumber={phoneNumber} />
      ) : (
        <CreateChat
          phoneNumber={phoneNumber}
          onPhoneChange={setPhoneNumber}
          onPhoneSubmit={setIsChatOpen}
        />
      )}
    </>
  );
};

export default Main;
