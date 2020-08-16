import axios from 'axios';
import { GET_CHATLIST, GET_CHATMESSAGE, UPDATE_CHATLIST, GET_FRIENDLIST,UPDATE_CHATMESSAGE,ACTIVE_CHAT,SET_SOCKET} from './type';

export const setSocket = (socket) => async dispatch => {
    dispatch({
        type: SET_SOCKET,
        payload:socket
    });
}

export const fetchChatList = () => async dispatch => {
    try {
    const res = await axios.get('http://localhost:5000/api/v1/chat/chatlist');
       
        dispatch({
            type: GET_CHATLIST,
            payload: res.data
        })
    } catch (err) {
        console.log(err.message)
    }
}

export const fetchChatMessage = (activeChat) => async dispatch => {
    
    dispatch({
        type: ACTIVE_CHAT,
        payload: activeChat
    })
    try {
        let res;
       if(activeChat.status === "p"){
            res = await axios.get(`http://localhost:5000/api/v1/chat/message/${activeChat.chatId}`);
       
       }else{
            res = await axios.get(`http://localhost:5000/api/v1/chat/message/group/${activeChat.chatId}`);
       }
       
        dispatch({
            type: GET_CHATMESSAGE,
            payload:res.data
        })
    } catch (err) {
        console.log(err.message)
    }
}


export const addMessage = (message) => async dispatch => {
    
    dispatch({
        type: UPDATE_CHATMESSAGE,
        payload:message
    });
}

export const addChat = (chat) => async dispatch =>{
    
    dispatch({
        type: UPDATE_CHATLIST,
        payload:chat
    })
}

export const fetchFriendList = () => async dispatch => {
   
    try {
        const res = await axios.get('http://localhost:5000/api/v1/chat/friend');
        
        dispatch({
            type: GET_FRIENDLIST,
            payload:res.data
        })
    } catch (err) {
        console.log(err.message)
    }
}
