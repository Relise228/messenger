import React, {useEffect, useState} from 'react';
import './Chat.css';
import {Avatar} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import {IconButton} from '@material-ui/core';
import Message from './Message';
import {useSelector} from 'react-redux';
import {selectChatId, selectChatName} from './features/chatSlice';
import db from './firebase';
import firebase from 'firebase';
import {selectUser} from './features/userSlice';
import FlipMove from 'react-flip-move';

function Chat() {
  const user = useSelector(selectUser);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const chatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);
  const [chatInfo, setChatInfo] = useState([]);

  useEffect(() => {
    if (chatId) {
      db.collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );

      db.collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) =>
          setChatInfo(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [chatId]);

  const getPhrase = async () => {
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    const result = await response.json();
    return result.value;
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input !== '') {
      db.collection('chats').doc(chatId).collection('messages').add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        uid: user.uid,
        photo: user.photo,
        email: user.email,
        displayName: user.displayName,
      });

      const phrase = await getPhrase();

      setTimeout(() => {
        db.collection('chats').doc(chatId).collection('messages').add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          message: phrase,
          uid: 565656,
          photo:
            'https://www.internetandtechnologylaw.com/files/2019/06/iStock-872962368-chat-bots.jpg',
          email: 'bot@gmail.com',
          displayName: 'BOT',
        });
      }, 10000);
    }

    setInput('');
  };
  return (
    <div className='chat'>
      {/* Chat header */}
      <div className='chat__header'>
        <Avatar src={chatInfo[0]?.photo} />
        <h2 className='chat__name'>{chatName}</h2>
      </div>
      {/* Chat messags */}
      <div className='chat__messages'>
        <FlipMove>
          {messages.map(({id, data}) => (
            <Message key={id} contents={data} />
          ))}
        </FlipMove>
      </div>
      {/* Chat input */}
      <div className='chat__input'>
        <form>
          <input
            type='text'
            placeholder='Type your message'
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button onClick={sendMessage}>
            <IconButton>
              <SendIcon />
            </IconButton>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
