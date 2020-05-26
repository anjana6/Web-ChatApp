import React from 'react';
import {connect} from 'react-redux';
import {Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    sender:{
        float:"left",
        backgroundColor:'#D1D1D1',
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
    }
}))

 

const ChatView = ({chatMessage,user}) => {
    const classes = useStyles();
    console.log(user && user._id);
    return (
        <div>
           {chatMessage && chatMessage.messages.map((item,index)=>{
               return(
                <Box component="div" key={index} className={item.sender === user._id? classes.sender:classes.reciver}>
                    {item.message}
                </Box>
               )
               
           })}
        </div>
    )
}

const mapStateToProps = state =>({
    chatMessage: state.chat.message,
    user: state.chat.user
})

export default connect(mapStateToProps)(ChatView);
