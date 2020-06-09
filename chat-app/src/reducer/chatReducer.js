import { GET_CHATLIST, GET_CHATMESSAGE, UPDATE_CHATLIST, GET_FRIENDLIST, ACTIVE_CHAT } from '../action/type';
import { fetchChatList } from '../action/chatAction';

const initialState = {
    chatlist: [],
    user: null,
    messages: null,
    friendlist: [],
    activeChatId: null,
}

export default (state=initialState,action) => {
    const {type,payload} = action;

    switch(type){
        case GET_CHATLIST:
            return { ...state, chatlist: payload.chatlist, user: payload.user };
        case GET_CHATMESSAGE:
            return { ...state, messages: payload };
        case ACTIVE_CHAT:
            return { ...state, activeChatId: payload };
        case UPDATE_CHATLIST:
            let foud = state.chatlist.some(ele => ele.chatId === payload.chatId);
            
            if (foud) {
                return {...state,chatlist:state.chatlist.map(chat => chat.chatId === payload.chatId?{...chat,messages:payload.messages,unread:(state.activeChatId === payload.chatId)?false :payload.unread}:chat),messages:(state.activeChatId === payload.chatId)? payload:state.messages}
            }
            else {
                return{...state,chatlist:[...state.chatlist,payload],messages:(state.activeChatId === payload.chatId? payload:state.messages)}
            }
        case GET_FRIENDLIST:
            return {...state,friendlist:payload}
        default:
            return state;
    }
}