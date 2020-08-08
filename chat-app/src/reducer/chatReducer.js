import { GET_CHATLIST, GET_CHATMESSAGE, UPDATE_CHATLIST, GET_FRIENDLIST, ACTIVE_CHAT,UPDATE_READMESSAGE, SET_SOCKET } from '../action/type';


const initialState = {
    socket: null,
    chatlist: [],
    user: null,
    messages: null,
    friendlist: [],
    activeChat: null,
    // activeChatName: '',
    // activeFrdId:null,
    rmsgId: null,
    hoo: null,
  
}

export default (state=initialState,action) => {
    const {type,payload} = action;

    switch(type){
        case SET_SOCKET:
            return {...state,socket:payload};
        case GET_CHATLIST:
            return { ...state, chatlist: payload.chatlist, user: payload.user };
        case GET_CHATMESSAGE:
            return { ...state,chatlist:state.chatlist.map(chat => chat.chatId === payload.chatId?{...chat,unread:payload.unred}:chat) ,messages: payload };
        case ACTIVE_CHAT:
            return { ...state, activeChat: payload};
        case UPDATE_CHATLIST:
            let foud = state.chatlist.some(ele => ele.chatId === payload.chatId);
            
            if (foud) {
                return {...state,chatlist:state.chatlist.map(chat => chat.chatId === payload.chatId?{...chat,messages:payload.messages,unread:payload.unread}:chat),messages:(state.activeChatId === payload.chatId)? payload:state.messages,rmsgId:payload.chatId}
            }
            else {
                return{...state,chatlist:[...state.chatlist,payload],messages:(state.activeChatId === payload.chatId? payload:state.messages),rmsgId:payload.chatId}
            };
        case UPDATE_READMESSAGE:{
            // console.log(payload.chatId)
            return {...state,hoo:payload}
        }
        case GET_FRIENDLIST:
            return {...state,friendlist:payload}
        default:
            return state;
    }
}