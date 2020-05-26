import axios from 'axios';
import io from 'socket.io-client';
import {GET_CHATLIST,GET_CHATMESSAGE} from './type';

const socket = io.connect('http://localhost:4000');


export const fetchChatList = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:4000/api/v1/chat/chatlist');
        console.log(res.data);
        dispatch({
            type:GET_CHATLIST,
            payload:res.data
        })
    } catch (error) {
        console.log(error.message);
    }

}

export const fetchChatMessage = (chatId) => async dispatch => {
    
    try {
        const res = await axios.get(`http://localhost:4000/api/v1/chat/message/${chatId}`);
        // console.log(res.data);
        dispatch({
            type:GET_CHATMESSAGE,
            payload:res.data
        })
    } catch (err) {
        console.log(err.message);
    }
}

export const joinRoom = (chatId) => async dispatch =>{
    console.log(chatId);
    
        socket.emit('Privetchat',{chatId})
   
}