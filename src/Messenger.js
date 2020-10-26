import React from 'react';
import {useSelector} from 'react-redux';
import Chat from './Chat';
import {selectChatId} from './features/chatSlice';
import './Messenger.css';
import './Sidebar';
import Sidebar from './Sidebar';

function Messenger() {
  const chat = useSelector(selectChatId);

  return (
    <div className='messenger'>
      {/* Sidebar */}
      <Sidebar />
      {/* Chat */}
      {chat && <Chat />}
    </div>
  );
}

export default Messenger;
