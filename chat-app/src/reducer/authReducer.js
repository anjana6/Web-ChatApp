import {LOGING_SUCCESS,LOGOUT_SUCCESS,SET_ERROR,REMOVE_ERROR} from '../action/type';
const initialState = {
    token:null,
    error: null
}

export default (state=initialState,action) => {
    const {type,payload} = action;

    switch(type){
        case LOGING_SUCCESS:
            return {...state,token:payload}
        case LOGOUT_SUCCESS:
            return {...state,token:null}
        case SET_ERROR:
            return {...state,error:payload};
        case REMOVE_ERROR:
            return{...state,error:null}
        default:
            return state;
    }
}