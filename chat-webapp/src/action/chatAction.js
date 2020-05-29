import axios from 'axios';
import io from 'socket.io-client';
import {GET_CHATLIST,GET_CHATMESSAGE,GET_FRIENDLIST,CLEAR_CHATPANEL} from './type';

const socket = io.connect('http://localhost:5000',{query:{token:localStorage.token}});


export const fetchChatList = () => async dispatch => {
    console.log('hoo');
    try {
        const res = await axios.get('http://localhost:5000/api/v1/chat/chatlist');
        console.log(res.data);
        dispatch({
            type:GET_CHATLIST,
            payload:res.data
        })
    } catch (error) {
        console.log(error.message);
    }

}

export const fetchMessages = (userId,chatId) => async dispatch => {
    console.log(userId)
    try {
        const res = await axios.get(`http://localhost:5000/api/v1/chat/message/${userId}/${chatId}`);
        
        dispatch({
            type:GET_CHATMESSAGE,
            payload:res.data
        })
        socket.emit('joinchat',chatId);
       
    } catch (err) {
        console.log(err.message);
    }
}

export const clearChatPanel = () => async dispatch =>{
    dispatch({
        type:CLEAR_CHATPANEL
    })
}

export const addMessage = () => async dispatch =>{

}

// export const fetchChatMessage = (chatId) => async dispatch =>{
//     // console.log(chatId);
//     try {
//         socket.emit('Privetchat',{chatId});
//         socket.on('online',msg =>{
//             console.log(msg);
//         })
//         socket.on('chatmessages', messages=>{
//             console.log(messages);
//             dispatch({
//                 type:GET_CHATMESSAGE,
//                 payload:messages
//             })
//         })
//     } catch (error) {
//         console.log(error);
//     }
    
        
   
// }

// // socket.on('message', msg =>{
// //     console.log(msg);
// // })

// export const sendMessage = (sender,friendId,msg) => dispatch => {
// //  console.log(chatId,friendId,msg);
//     socket.emit('chatMessage',{sender,friendId,msg});
//     // socket.on('onemsg',message =>{
//     //     console.log(message);
//     // });
// }

export const fetchFriendList = () =>async dispatch =>{
    try {
        const res =await axios.get('http://localhost:5000/api/v1/chat/friend');
        console.log(res.data);
        dispatch({
            type:GET_FRIENDLIST,
            payload:res.data
        })

    } catch (error) {
        console.log(error.message);
    }
    
}