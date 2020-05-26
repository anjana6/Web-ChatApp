import {GET_CHATLIST,GET_CHATMESSAGE} from '../action/type';

const initialState = {
    chatlist : [],
    user: null,
    message: null
}

export default (state=initialState,action) => {
    const {type,payload} = action;

    switch(type){
        case GET_CHATLIST:
            return {...state,chatlist:payload.chatlist,user:payload.user};
        case GET_CHATMESSAGE:
            return {...state,message:payload};
        default:
            return state;
    }
}