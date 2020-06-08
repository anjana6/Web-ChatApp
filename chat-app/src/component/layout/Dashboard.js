import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { fetchChatList } from '../../action/chatAction';
import ChatView from '../chat/ChatView';
import ChatList from '../chat/ChatList';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        display: 'flex',
        float: "left"
    },
    leftBar: {
        width: 350,
    },
    chatpanel: {
        width:"100%"
    }
   
}))



const Dashboard = ({ fetchChatList, user }) => {
    const [state, setState] = useState({ socket: null, friendId: null });
    const classes = useStyles();

    useEffect(() => {
        fetchChatList()
        initialSocket()
           
    }, [fetchChatList]);
   

    const initialSocket = () => {
        const socket = io.connect('http://localhost:5000', { query: { token: localStorage.token } });
        setState({ ...state, socket: socket });
        socket.emit('JOIN CHAT');
        socket.on('MESSAGE', (msg) => {
          console.log(msg);
        });
    }

    const setFriendId = (friend) => {
        setState({ ...state, friend: friend })
       
    }
     
    return (
       
        <div className={classes.root}>
            <div className={classes.leftBar}>
                <ChatList setFriendId={setFriendId} />
            </div>
            <div className={classes.chatpanel}>
                {state.friend && <ChatView socket={state.socket} friend={state.friend} />}
            </div>
            
           
         </div>
         
    )
}

const mapStateToProps = state => ({
    user:state.chat.user
})

export default connect(mapStateToProps,{fetchChatList})(Dashboard);
