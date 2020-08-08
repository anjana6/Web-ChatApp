import React from 'react';
import {makeStyles} from '@material-ui/core';

import ChatList from '../chats/ChatList';
import LeftAppBar from './LeftAppBar'


const useStyles = makeStyles((theme) => ({
    root: {
      width:360
      // backgroundColor: theme.palette.background.paper,
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
