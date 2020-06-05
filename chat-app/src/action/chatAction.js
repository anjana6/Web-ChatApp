import axios from 'axios';

export const fetchChatList = () => async dispatch => {
    console.log('hee');
    try {
        const res = await axios.get('http://localhost:4000/api/v1/chat/chatlist'); 
        console.log(res.data);
    } catch (err) {
        console.log(err.message);
    }
}