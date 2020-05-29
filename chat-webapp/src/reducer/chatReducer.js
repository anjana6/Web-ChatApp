import {GET_CHATLIST,GET_CHATMESSAGE, GET_FRIENDLIST, CLEAR_CHATPANEL} from '../action/type';

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
        case CLEAR_CHATPANEL:
            return {...state,messages:null};
        default:
            return state;
    }
}