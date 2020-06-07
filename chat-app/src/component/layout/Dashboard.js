import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { fetchChatList } from '../../action/chatAction';
import chatReducer from '../../reducer/chatReducer';



const Dashboard = ({ fetchChatList, user }) => {
    const [state, setState] = useState({socket:null})
    useEffect(() => {
        fetchChatList()
        initialSocket()
           
    }, [fetchChatList]);
   

    const initialSocket = () => {
        const socket = io.connect('http://localhost:5000', { query: { token: localStorage.token } });
        setState({ ...state, socket: socket });
        socket.emit('JOIN CHAT')
    }

    return (
       
        <div>
            dash
         </div>
         
    )
}

const mapStateToProps = state => ({
    user:state.chat.user
})

export default connect(mapStateToProps,{fetchChatList})(Dashboard);
