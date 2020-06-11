import { GET_CHATLIST, GET_CHATMESSAGE, UPDATE_CHATLIST, GET_FRIENDLIST, ACTIVE_CHAT,UPDATE_RECIVECHATID } from '../action/type';


const initialState = {
    chatlist: [],
    user: null,
    messages: null,
    friendlist: [],
    activeChatId: null,
    rmsgId: null,
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
                return {...state,chatlist:state.chatlist.map(chat => chat.chatId === payload.chatId?{...chat,messages:payload.messages,unread:(state.activeChatId === payload.chatId)?false :payload.unread}:chat),messages:(state.activeChatId === payload.chatId)? payload:state.messages,rmsgId:payload.chatId}
            }
            else {
                return{...state,chatlist:[...state.chatlist,payload],messages:(state.activeChatId === payload.chatId? payload:state.messages),rmsgId:payload.chatId}
            };
        // case UPDATE_RECIVECHATID:
        //     return {...state,resivedmssegeId:payload}
        case GET_FRIENDLIST:
            return {...state,friendlist:payload}
        default:
            return state;
    }
}