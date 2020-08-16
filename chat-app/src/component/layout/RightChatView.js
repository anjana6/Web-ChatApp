import React,{useEffect,useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import io from 'socket.io-client';
import {makeStyles,TextField,IconButton} from '@material-ui/core';
import {Send} from '@material-ui/icons';

import MessageView from '../chats/MessageView';
import DefaultView from './DefaultView';
import RightViewAppBar from './RightViewAppBar'
import {setSocket,addChat,addMessage} from '../../action/chatAction';


const useStyles = makeStyles((theme) => ({
    root: {
    
     minwidth:"500px"
    },
    msgView:{
        height:"80vh"
    },
    textBox:{
        backgroundColor:'white',
        padding:5,
        display: "flex"
    },
    typingBox:{
        backgroundColor:'LightGray',
        marginLeft:30,
        marginRight:30,
        width:"80%",
        border:"1px solid black",
        borderRadius:25,
        padding:10,
        textAlign:"center",
    },
    textInput:{
        marginLeft:20,
        marginRight:20,
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
        console.log(msg);
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
                    <div className={classes.typingBox}>
                        <div className={classes.textInput}>
                            <TextField 
                                id="standard-secondary"  
                                color="primary"
                                placeholder="Type a message"
                                fullWidth 
                                onChange={onChange}
                                value={msg}
                                />
                        </div>
                        
                    </div>
                    <IconButton  aria-label="add an alarm" onClick={onSubmit}>
                        < Send/>
                    </IconButton>
                </div>
            </>
          :
            <DefaultView/>
            }   
        </div>
    )
}

export default RightChatView;
