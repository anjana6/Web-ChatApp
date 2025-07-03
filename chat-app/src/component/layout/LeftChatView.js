import React from 'react';
import {makeStyles} from '@material-ui/core';

import ChatList from '../chats/ChatList';
import LeftAppBar from './LeftViewAppBar'


const useStyles = makeStyles((theme) => ({
    root: {
      width: 360,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    chatListContainer: {
      flex: 1,
      overflow: 'hidden',
    },
  }));

const LeftChatView = ({ onGroupCreated }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <LeftAppBar onGroupCreated={onGroupCreated}/>
            <div className={classes.chatListContainer}>
                <ChatList onDrawerClose={onGroupCreated}/>
            </div>
        </div>
    )
}

export default LeftChatView
