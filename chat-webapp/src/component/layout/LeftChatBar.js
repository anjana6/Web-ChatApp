import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Appbar from './Appbar';
import ChatList from '../chat/ChatList';
import {fetchChatList} from '../../action/chatAction';

const useStyles = makeStyles((theme) =>({
    root: {
        width: '100%',
        height:'100vh',
        maxWidth: 350,
        backgroundColor: theme.palette.background.paper,
      },
}));

const LeftChatBar = ({fetchChatList}) => {
    const classes = useStyles();
    useEffect(() => {
       fetchChatList()
    }, [fetchChatList])
    return (
        <div className={classes.root}>
            <Appbar/>
            <ChatList/>
        </div>
    )
}

export default connect(null,{fetchChatList})(LeftChatBar)
