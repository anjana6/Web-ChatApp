import React from 'react';
import {connect} from 'react-redux';
import {Box, makeStyles,Grid, Container } from '@material-ui/core';
import ChatTextBox from './ChatTextBox';
import { CallReceived } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root:{
        width:"80%",
        height:"90vh"
    },
    // chatviewcontainer:{
    //     height:"97vh",
    //     // position:'absolute',
    // },
    // messagecontainer:{
    //     height:"90vh"
    // },
    sender:{
        float:"left",
        backgroundColor:'#A5E29E',
        margin: theme.spacing(2),
        padding:theme.spacing(2),
        borderRadius: theme.spacing(8),
        width:400
    },
    reciver:{
        float:"right",
        backgroundColor:'#D1D1D1',
        margin: theme.spacing(2),
        padding:theme.spacing(2),
        borderRadius: theme.spacing(8),
        width:400
    },
    // typebox:{
    //     // position: 'absolute',
    //     // bottom: '5px',
    //     // marginTop:'3900',
    //     // backgroundColor:'red',
    //     // border:"1px black solid"
       
    // }
}))

 

const ChatView = ({chatMessage,user,friendId}) => {
    const classes = useStyles();
    // console.log(user && user._id);
    return (
        <div>
             <Box component="div" className={classes.root}>
            {chatMessage && chatMessage.messages.map((item,index)=>{
                return(
                    
                    <Box component="div" key={index} className={item.sender === user._id? classes.sender:classes.reciver}>
                        {item.message}
                    </Box>
                )
                
            })}
            </Box>
            <Box>
                <ChatTextBox sender={user._id} friendId={friendId} chatId={chatMessage && chatMessage.chatId}/>
            </Box>
        </div>
           
            
          
       
            
    )
}

const mapStateToProps = state =>({
    chatMessage: state.chat.message,
    user: state.chat.user
})

export default connect(mapStateToProps)(ChatView);
