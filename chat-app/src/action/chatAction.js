import axios from 'axios';
import { GET_CHATLIST, GET_CHATMESSAGE, UPDATE_CHATLIST, GET_FRIENDLIST,ACTIVE_CHAT,SET_SOCKET,UPDATE_READMESSAGE} from './type';

export const setSocket = (socket) => async dispatch => {
    // console.log(socket);
    dispatch({
        type: SET_SOCKET,
        payload:socket
    });
}

export const fetchChatList = () => async dispatch => {
    try {
    const res = await axios.get('http://localhost:5000/api/v1/chat/chatlist');
       console.log(res.data);
        dispatch({
            type: GET_CHATLIST,
            payload: res.data
        })
    } catch (err) {
        console.log(err.message)
    }
}

export const fetchChatMessage = (activeChat) => async dispatch => {
    //console.log(activeChat);
    dispatch({
        type: ACTIVE_CHAT,
        payload: activeChat
    })
    try {
       
        const res = await axios.get(`http://localhost:5000/api/v1/chat/message/${activeChat.chatId}`);
        // console.log(res.data);
        // console.log('now')
        dispatch({
            type: GET_CHATMESSAGE,
            payload:res.data
        })
    } catch (err) {
        console.log(err.message)
    }
}

export const fetchGroupMessage = (chatId) => async dispatch => {
    console.log('gr',chatId);
    try {
        const res = await axios.get(`http://localhost:5000/api/v1/chat/message/group/${chatId}`);
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
    });
    // dispatch({
    //     type:UPDATE_RECIVECHATID,
    //     payload:chat.chatId
    // })
}

export const fetchFriendList = () => async dispatch => {
    console.log('frend');
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

// export const updateReadMessage = (chatId) => async dispatch => {
//     console.log(chatId);
//     try {
//         const res = await axios.put(`http://localhost:5000/api/v1/chat/${chatId}`);
//         // console.log(res.data);
//         const unread = res.data;
//         console.log(unread)
//         // dispatch({
//         //     type:UPDATE_READMESSAGE,
//         //     payload:res.data
//         // })
//     } catch (err) {
//         console.log(err.message)
//     }
// }

export const createNewGroup = (members) => async dispatch =>{
    console.log(members)
}