import axios from 'axios';
import {LOGING_SUCCESS,LOGOUT_SUCCESS,SET_ERROR,REMOVE_ERROR} from './type';

export const signIn = (body,history) => async dispatch => {
    
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        const res = await axios.post('http://localhost:5000/api/v1/auth/signin',body,config);
        const token = res.data.token;
        axios.defaults.headers.common['x-auth-token'] = token;
        localStorage.setItem('token',token)
        history.push('/dashboard');

        dispatch({
            type:LOGING_SUCCESS,
            payload:token
        })
    } catch (err) {
        const error = err.response.data;
        dispatch({
            type:SET_ERROR,
            payload:error
        });
        setTimeout(() => {
            dispatch({
                type:REMOVE_ERROR
            })
        },5000)
        console.log(err.message)
    }
}

export const signUp = (body,history) => async dispatch => {
   
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        await axios.post('http://localhost:5000/api/v1/auth/signup',body,config);
        history.push('/');
       
    } catch (err) {
        const error = err.response.data
        dispatch({
            type:SET_ERROR,
            payload: error
        })
        setTimeout(() => {
            dispatch({
                type:REMOVE_ERROR
            })
        },5000)
    }
}

export const logOut = () => async dispatch =>{
    console.log('chekc')
    localStorage.removeItem('token')
    dispatch({
        type:LOGOUT_SUCCESS,
    })
}