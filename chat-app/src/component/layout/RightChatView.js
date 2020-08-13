import React,{useEffect,useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import io from 'socket.io-client';
import {makeStyles} from '@material-ui/core';

import MessageView from '../chats/MessageView';
import DefaultView from './DefaultView';
import RightViewAppBar from './RightViewAppBar'
import {setSocket,addChat,addMessage} from '../../action/chatAction';


const useStyles = makeStyles((theme) => ({
    root: {
    
     minwidth:"500px"
    //  height:"100vh",
    //  position:'absoulte'
      // backgroundColor: theme.palette.background.paper,
    },
    msgView:{
        height:"85vh"
    },
    textBox:{
        // backgroundColor:'red',
        // width:50,
        // border:"1px solid black",
        // padding:10
        textAlign:"center",
        // padding:10,
        // width:400
    },
    textInput:{
        backgroundColor:"gray"
    }
  }));

const RightChatView = () => {
    const classes = useStyles();
    const activechat = useSelector(state => state.chat.activeChat);
    const [msg, setMsg] = useState('');
    const [type,setType] = useState('');
    const dispatch = useDispatch();
    const socket = useSelector(state => state.chat.socket)
    
    useEffect(() => {
        const socket = io.connect('http://localhost:5000', { query: { token: localStorage.token } });
        dispatch(setSocket(socket));
        socket.on('MESSAGE', (msg) => {
            console.log(msg);
            dispatch(addMessage(msg))
        })
        socket.on('CHAT', chat => {
            console.log(chat);
            dispatch(addChat(chat))
        })
        socket.on('SEND', msg =>{
            console.log(msg);
            setType(msg);
            setTimeout(() => {
                setType('');
            }, 3000);
        })
    }, [dispatch]);

    const onSubmit = (e) => {
        e.preventDefault();
        if(activechat.status === "p"){
            const {chatId,frdId,name} = activechat;
            socket.emit('CHAT_MESSAGE', {chatId,frdId,name,msg });
        }else{
            const {chatId} = activechat;
            socket.emit('GROUP_MESSAGE', {chatId,msg });
        }
        
        setMsg('');
    }

    const onChange = (e) => {
        const {frdId} = activechat;
        setMsg(e.target.value);
        socket.emit('TYPING',{frdId})
        
    }

    
    return (
        <div className={classes.root}>
         {activechat ?
            <>
                <RightViewAppBar name={activechat.name} type={type}/>
                <div className={classes.msgView}>
                    <MessageView/>
                </div>
                <div className={classes.textBox}>
                        <input type="text" onChange={onChange} value={msg}/>
                        <button onClick={onSubmit}>submit</button>    
                </div>
            </>
          :
            <DefaultView/>
            }   
        </div>
    )
}

export default RightChatView;
