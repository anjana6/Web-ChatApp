import { GET_CHATLIST } from '../action/type';

const initialState = {
    chatlist: [],
    user:null
}

export default (state=initialState,action) => {
    const {type,payload} = action;

    switch(type){
        case GET_CHATLIST:
            return {...state,chatlist:payload.chatlist,user:payload.user}
        default:
            return state;
    }
}