import {Avatar} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import './Sidebar.css';
import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from './SidebarChat';
import {useSelector} from 'react-redux';
import {selectUser} from './features/userSlice';
import db, {auth} from './firebase';

function Sidebar() {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);
  const [searchChats, setSearchChats] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const chatItems = searchValue ? searchChats : chats;

  useEffect(() => {
    db.collection('chats').onSnapshot((snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const addChat = () => {
    const chatName = prompt('Please enter a chat name');
    db.collection('chats').add({
      chatName: chatName,
    });
  };

  const searchChat = (e) => {
    setSearchValue(e.target.value);
    setSearchChats([
      ...chats.filter((chat) =>
        chat.data.chatName.toLowerCase().includes(e.target.value.toLowerCase())
      ),
    ]);
  };

  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <Avatar
          className='sidebar__avatar'
          src={user.photo}
          onClick={() => {
            auth.signOut();
          }}
        />
        <div className='sidebar__input'>
          <SearchIcon />
          <input placeholder='Search or start new chat' onChange={searchChat} />
        </div>
      </div>

      <div className='sidebar__chats'>
        <h2 className='sidebar__chats-title'>Chats</h2>
        <button className='sidebar__addChat' onClick={addChat}>
          Add a new Chat
        </button>
        {chatItems.map(({id, data: {chatName}}) => (
          <SidebarChat key={id} id={id} chatName={chatName} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;