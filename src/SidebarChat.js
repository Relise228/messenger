import React, {useEffect, useState} from 'react';
import './SidebarChat.css';
import {Avatar} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {setChat} from './features/chatSlice';
import db from './firebase';
import * as timeago from 'timeago.js';

function SidebarChat({id, chatName}) {
  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState([]);

  useEffect(() => {
    db.collection('chats')
      .doc(id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setChatInfo(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);

  const lastMessage =
    chatInfo[0]?.message.length > 70
      ? chatInfo[0]?.message.substr(0, 70) + '...'
      : chatInfo[0]?.message;

  return (
    <div
      className='sidebarChat'
      onClick={() => {
        dispatch(
          setChat({
            chatId: id,
            chatName: chatName,
          })
        );
      }}
    >
      <Avatar src={chatInfo[0]?.photo} />
      <div className='sidebarChat__info'>
        <h3>{chatName}</h3>
        <p>{lastMessage}</p>
        <small>
          {timeago.format(new Date(chatInfo[0]?.timestamp?.toDate()))}
        </small>
      </div>
    </div>
  );
}

export default SidebarChat;
