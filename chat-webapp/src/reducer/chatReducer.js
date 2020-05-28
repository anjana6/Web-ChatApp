import {GET_CHATLIST,GET_CHATMESSAGE, GET_FRIENDLIST} from '../action/type';

const initialState = {
    chatlist : [],
    friends : [],
    user: null,
    messages: null
}

export default (state=initialState,action) => {
    const {type,payload} = action;

    switch(type){
        case GET_CHATLIST:
            return {...state,chatlist:payload,user:payload.user};
        case GET_CHATMESSAGE:
            return {...state,messages:payload};
        case GET_FRIENDLIST:
            return {...state,friends:payload};
        default:
            return state;
    }
}