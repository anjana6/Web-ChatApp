import { GET_CHATLIST, GET_CHATMESSAGE, UPDATE_CHATLIST } from '../action/type';

const initialState = {
    chatlist: [],
    user: null,
    messages:null,
}

export default (state=initialState,action) => {
    const {type,payload} = action;

    switch(type){
        case GET_CHATLIST:
            return { ...state, chatlist: payload.chatlist, user: payload.user };
        case GET_CHATMESSAGE:
            return { ...state, messages: payload };
        case UPDATE_CHATLIST:
            
        default:
            return state;
    }
}