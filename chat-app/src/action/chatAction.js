import axios from 'axios';
import { GET_CHATLIST } from './type';

export const fetchChatList = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:4000/api/v1/chat/chatlist'); 
        // console.log(res.data);

        dispatch({
            type:GET_CHATLIST,
            payload:res.data
        })
    } catch (err) {
        console.log(err.message);
    }
}

export const fetchChatMessage = (socket,chatId) => async dispatch => {
    // console.log(socket);
    // console.log(chatId);
    socket.emit('PREVIOUS_MESSAGE', chatId);
    socket.on('MESSAGES', msg =>{
        console.log(msg);
    })

}