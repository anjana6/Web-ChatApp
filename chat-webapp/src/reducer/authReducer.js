import {LOGING_SUCCESS} from '../action/type';
const initialState = {
    token:null
}

export default (state=initialState,action) => {
    const {type,payload} = action;

    switch(type){
        case LOGING_SUCCESS:
            return {...state,token:payload}
        default:
            return state;
    }
}