import {GET_CHATLIST,GET_CHATMESSAGE, GET_FRIENDLIST, ADD_NEWMESSAGE} from '../action/type';

const initialState = {
   
}

export default (state=initialState,action) => {
    const {type,payload} = action;

    switch(type){
        default:
            return state;
    }
}