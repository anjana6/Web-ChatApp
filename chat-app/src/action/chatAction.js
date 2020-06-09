import axios from 'axios';
import { GET_CHATLIST, GET_CHATMESSAGE, UPDATE_CHATLIST, GET_FRIENDLIST,ACTIVE_CHAT } from './type';

export const fetchChatList = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/v1/chat/chatlist');
        // console.log(res.data);
        dispatch({
            type: GET_CHATLIST,
            payload: res.data
        })
    } catch (err) {
        console.log(err.message)
    }
}

export const fetchChatMessage = (chatId) => async dispatch => {
    // console.log(chatId);
    try {
        const res = await axios.get(`http://localhost:5000/api/v1/chat/message/${chatId}`);
        console.log(res.data);
        dispatch({
            type: GET_CHATMESSAGE,
            payload:res.data
        })

        dispatch({
            type: ACTIVE_CHAT,
            payload: chatId
        })
    } catch (err) {
        console.log(err.message)
    }
}

export const addNewMessage = (chat) => async dispatch => {
    console.log(chat);
    dispatch({
        type: UPDATE_CHATLIST,
        payload:chat
    })
}

export const fetchFriendList = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/v1/chat/friend');
        // console.log(res.data)
        dispatch({
            type: GET_FRIENDLIST,
            payload:res.data
        })
    } catch (err) {
        console.log(err.message)
    }
}