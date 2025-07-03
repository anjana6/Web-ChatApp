import React, { Fragment, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { List, makeStyles } from '@material-ui/core';


import PrivetListItem from './ChatLIstItem';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.grey[400],
      borderRadius: '3px',
      '&:hover': {
        background: theme.palette.grey[500],
      },
    },
  },
  list: {
    padding: 0,
  },
}));

const ChatList = ({ onDrawerClose }) => {
    const classes = useStyles();
    const chatList = useSelector(state => state.chat.chatlist);
    const activeChat = useSelector(state => state.chat.activeChat);
    const listRef = useRef(null);
    
    // Auto-scroll to active chat when it changes
    useEffect(() => {
        if (activeChat && listRef.current) {
            const activeElement = listRef.current.querySelector(`[data-chat-id="${activeChat.chatId}"]`);
            if (activeElement) {
                activeElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }
        }
    }, [activeChat]);
    
    return (
      <div className={classes.root} ref={listRef}>
        <List className={classes.list}>
          {chatList.map((item, index) => {
            return (
              <Fragment key={item._id}>
                    <PrivetListItem item={item} onDrawerClose={onDrawerClose}/> 
              </Fragment>
            );
          })}
        </List>
      </div>
    );
}



export default ChatList;


