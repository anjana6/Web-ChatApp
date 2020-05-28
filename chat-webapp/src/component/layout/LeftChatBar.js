import React from 'react';
import { makeStyles } from '@material-ui/core';
import Drawer from './Appbar';
import ChatList from '../chat/ChatList';

const useStyles = makeStyles((theme) =>({
    root: {
        width: '100%',
        height:'100vh',
        maxWidth: 350,
        backgroundColor: theme.palette.background.paper,
      },
}));

const LeftChatBar = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Drawer/>
            <ChatList/>
        </div>
    )
}

export default LeftChatBar
