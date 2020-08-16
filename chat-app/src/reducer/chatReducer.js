import { GET_CHATLIST, GET_CHATMESSAGE,UPDATE_CHATMESSAGE, UPDATE_CHATLIST, GET_FRIENDLIST, ACTIVE_CHAT, SET_SOCKET } from '../action/type';


const initialState = {
    socket: null,
    chatlist: [],
    user: null,
    messages: [],
    friendlist: [],
    activeChat: null,
    rmsgId: null, 
}

export default (state=initialState,action) => {
    const {type,payload} = action;

    switch(type){
        case SET_SOCKET:
            return {...state,socket:payload};
        case GET_CHATLIST:
            return { ...state, chatlist: payload.chatlist, user: payload.user };
        case GET_CHATMESSAGE:
            return { ...state,messages: payload };
        case ACTIVE_CHAT:
            return { ...state, 
                activeChat: payload,
                chatlist:state.chatlist.map(chat => chat.chatId === payload.chatId?{...chat,unread:false}:chat)};
        case UPDATE_CHATMESSAGE:
            if(state.activeChat){
            return {...state,
                messages:payload.chatId === state.activeChat.chatId?[...state.messages,payload.message]:state.messages,
                chatlist:state.chatlist.map(chat => chat.chatId === payload.chatId?{...chat,messages:[...chat.messages,payload.message],
                unread:payload.chatId !== state.activeChat.chatId? true:false}:chat)};
            }
            else{
                return {...state,
                    messages:state.messages,
                    chatlist:state.chatlist.map(chat => chat.chatId === payload.chatId?{...chat,messages:[...chat.messages,payload.message],unread:true}:chat)}
            }
        case UPDATE_CHATLIST:
            if(state.activeChat){
            return {...state,
                chatlist:[...state.chatlist,payload],
                messages:payload.chatId === state.activeChat.chatId? payload.messages: state.messages};
            }else{
                return {...state,chatlist:[...state.chatlist,payload]}
            }
        case GET_FRIENDLIST:
            return {...state,friendlist:payload.filter(frnd => frnd._id !== state.user._id)}
        default:
            return state;
    }
}