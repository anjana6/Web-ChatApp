import {GET_CHATLIST,GET_CHATMESSAGE, GET_FRIENDLIST, ADD_NEWMESSAGE} from '../action/type';

const initialState = {
    chatlist : [],
    friends : [],
    user: null,
    messages: null,
    newMessage: [],
}

export default (state=initialState,action) => {
    const {type,payload} = action;

    switch(type){
        case GET_CHATLIST:
            return {...state,chatlist:payload};
        case GET_CHATMESSAGE:
            return {...state,messages:payload};
        case GET_FRIENDLIST:
            return {...state,friends:payload.friend,user:payload.user};
        case ADD_NEWMESSAGE:
            return {...state,newMessage:[...state.newMessage,payload]};
        default:
            return state;
    }
}