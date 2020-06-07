import axios from 'axios';
import {LOGING_SUCCESS} from './type';

export const signIn = (body,history) => async dispatch => {
    
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        const res = await axios.post('http://localhost:5000/api/v1/auth/signin',body,config);
        const token = res.data.token;
        // console.log(token);
        axios.defaults.headers.common['x-auth-token'] = token;
        localStorage.setItem('token',token)
        history.push('/dashboard');

        dispatch({
            type:LOGING_SUCCESS,
            payload:token
        })
    } catch (err) {
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
        const res = await axios.post('http://localhost:5000/api/v1/auth/signup',body,config);
        history.push('/');
        console.log(res.data);
    } catch (err) {
        console.log(err.message)
    }
}