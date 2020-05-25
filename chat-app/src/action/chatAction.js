import axios from 'axios';

export const fetchChatList = () => async dispatch => {

    try {
        const res = axios.get();
        console.log(res.data);
    } catch (error) {
        console.log(error.message);
    }

}