import { GET_CHATLIST, GET_CHATMESSAGE, UPDATE_CHATLIST, GET_FRIENDLIST } from '../action/type';

const initialState = {
    chatlist: [],
    user: null,
    messages: null,
    friendlist: []
}

export default (state=initialState,action) => {
    const {type,payload} = action;

    switch(type){
        case GET_CHATLIST:
            return { ...state, chatlist: payload.chatlist, user: payload.user };
        case GET_CHATMESSAGE:
            return { ...state, messages: payload };
        case UPDATE_CHATLIST:
            let foud = state.chatlist.some(ele => ele.chatId === payload.chatId);
            console.log(foud);
            if (foud) {
                return {...state,chatlist:state.chatlist.map(chat => chat.chatId === payload.chatId?{...chat,messages:payload.messages}:chat),messages:(state.messages && state.messages.chatId === payload.chatId)?payload:state.messages}
            }
            else {
                return{...state,chatlist:[...state.chatlist,payload]}
            }
            // return {
            //     // ...state,chatlist:state.chatlist.map(chat => chat.chatId === payload.chatId?{...chat,messages:payload.messages}:chat)
                
            // }
        case GET_FRIENDLIST:
            return {...state,friendlist:payload}
        default:
            return state;
    }
}