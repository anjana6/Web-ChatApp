import {GET_CHATLIST,GET_CHATMESSAGE, GET_FRIENDLIST, ADD_NEWMESSAGE} from '../action/type';

const initialState = {
   chatlist : []
}

export default (state=initialState,action) => {
    const {type,payload} = action;

    switch(type){
        case GET_CHATLIST:
            return {...state,chatlist:payload}
        default:
            return state;
    }
}