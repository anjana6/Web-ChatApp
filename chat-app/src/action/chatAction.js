import axios from 'axios';
import { GET_CHATLIST } from './type';

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