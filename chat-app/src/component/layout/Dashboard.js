import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux'
import io from 'socket.io-client';

import {fetchChatList} from '../../action/chatAction';
import ChatList from '../chat/ChatList';
import ChatView from '../chat/ChatView';

const socketURL = 'http://localhost:4000'
// let socket = io.connect('http://localhost:5000',{query:{token:localStorage.token}});


const Dashboard = ({fetchChatList}) => {
    const [state, setState] = useState({socket:null})

    useEffect(() => {
        fetchChatList();
        socketinit()
    }, []);

    const socketinit = () => {
        const socket = io.connect(socketURL,{query:{token:localStorage.token}});
        setState({...state,socket:socket});
    }
    return (
        <div>
           <ChatList socket={state.socket}/>
           <ChatView socket={state.socket}/>

        </div>
    )
}

export default connect(null,{fetchChatList})(Dashboard);
