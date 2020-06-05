import axios from 'axios';
import io from 'socket.io-client';
import {GET_CHATLIST,GET_CHATMESSAGE,GET_FRIENDLIST, ADD_NEWMESSAGE} from './type';


let socket = io.connect('http://localhost:5000',{query:{token:localStorage.token}});


export const fetchChatList = () => async dispatch => {
    
    try {
        const res = await axios.get('http://localhost:5000/api/v1/chat/chatlist');
      
        dispatch({
            type:GET_CHATLIST,
            payload:res.data
        })
    } catch (error) {
        console.log(error.message);
    }

}

export const fetchMessages = (chatId) => async dispatch => {
    // console.log(chatId)
    // try {
    //     const res = await axios.get(`http://localhost:5000/api/v1/chat/message/${chatId}`);
    //     // console.log(res.data)
       
    //     dispatch({
    //         type:GET_CHATMESSAGE,
    //         payload:res.data
    //     })
        
    // } catch (err) {
    //     console.log(err.message);
    // }
    
    // console.log(socket);
    socket.emit('GET_CHATMESSAGE',chatId);
    // console.log(chatId);
    socket.on('CHAT_MESSAGES', msg => {
        console.log(msg);
    })
}

export const addMessage = () => async dispatch =>{

}


export const joinChat = (chatId) => async dispatch =>{
    console.log(chatId);
    // console.log(socket);
    
    
        
    socket.emit('JOINCHAT',chatId);
    socket.on('ONE_MESSAGE',msg => {
        console.log(msg);
    })
      
        
    //     socket.on('status',message =>{
    //         console.log(message);
    //     });
    //     socket.on('message', msg => {
    //         // fetchChatList()
    //         console.log("hoo",msg);
    //         // dispatch({
    //         //     type:ADD_NEWMESSAGE,
    //         //     payload:msg
    //         // })
    //     })
}

export const sendMessage = (friendId,text,userId,chatId) =>async dispatch =>{
    // console.log(socket);
    // console.log(text);
    socket.emit('NEW_MESSAGE', text);
    // console.log(friendId,text,userId);
    // console.log("sm",chatId);
    // socket.emit('chatMessage',{friendId,text,userId,chatId});
    
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
        // console.log(res.data);
        dispatch({
            type:GET_FRIENDLIST,
            payload:res.data
        })

    } catch (error) {
        console.log(error.message);
    }
    
}