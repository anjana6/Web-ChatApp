import React from 'react';
import {makeStyles} from '@material-ui/core';

import ChatList from '../chats/ChatList';
import LeftAppBar from './LeftViewAppBar'


const useStyles = makeStyles((theme) => ({
    root: {
      width:360
    },
  }));

const LeftChatView = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <LeftAppBar/>
            <ChatList/>
        </div>
    )
}

export default LeftChatView
