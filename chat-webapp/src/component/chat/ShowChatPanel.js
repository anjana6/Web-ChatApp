import React from 'react';
import {Box,makeStyles} from '@material-ui/core';
import { connect } from 'react-redux';
import ChatTextBox from './ChatTextBox';


const useStyles = makeStyles((theme)=>({
    root:{
        minWidth:300
    },
    sender:{
        float:'left',
        backgroundColor:'#A5E29E',
        width:'50%',
        padding:20,
        margin:theme.spacing(3),
        borderRadius:theme.spacing(3)
    },
    reciver:{
        float:'right',
        backgroundColor:'#1FFC05',
        width:'50%',
        padding:20,
        margin:theme.spacing(3),
        borderRadius:theme.spacing(3)
    },
    showMessageBox:{
        height:'79vh',
        backgroundColor:'red'
    },

}))


const ShowChatPanel = ({chatmessages}) => {
    
    const classes = useStyles();
    // console.log(chatmessages.messages.length)
    return (
        <div className={classes.root}>
            <Box className={classes.showMessageBox}>
                {chatmessages && chatmessages.messages.map((item,index)=>{
                    return(
                        <Box className={item.sender === chatmessages.userId? classes.sender:classes.reciver} key={index}>
                            {item.message}
                        </Box>
                    )
                })}
                
            </Box>
            <div>
            <ChatTextBox/>
            </div>
            
        </div>
    )
}
const mapStateToProps = state => ({
    chatmessages: state.chat.messages
})

export default connect(mapStateToProps)(ShowChatPanel);
