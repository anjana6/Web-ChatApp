import React,{useEffect} from 'react';
import {connect} from 'react-redux'
import io from 'socket.io-client';

import {fetchChatList} from '../../action/chatAction'

const socketURL = 'http://localhost:4000'
// let socket = io.connect('http://localhost:5000',{query:{token:localStorage.token}});


const Dashboard = ({fetchChatList}) => {
    useEffect(() => {
        fetchChatList();
        socketinit()
    }, []);

    const socketinit = () => {
        const socket = io.connect(socketURL,{query:{token:localStorage.token}})
    }
    return (
        <div>
           dashboard 
        </div>
    )
}

export default connect(null,{fetchChatList})(Dashboard);
