import React from 'react';
import { Box,makeStyles,AppBar,Toolbar,Typography } from '@material-ui/core';
import ChatTextBox from './ChatTextBox';
import { connect } from 'react-redux';
import {updateReadMessage} from '../../action/chatAction';

const useStyles = makeStyles((theme) => ({
    root: {
        // minWidth: 300,
        backgroundColor:"yellow"
    },
    sender: {
        float: 'left',
        backgroundColor: '#A5E29E',
        width: '50%',
        padding: 20,
        margin: theme.spacing(3),
        borderRadius: theme.spacing(3)
    },
    reciver: {
        float: 'right',
        backgroundColor: '#1FFC05',
        width: '50%',
        padding: 20,
        margin: theme.spacing(3),
        borderRadius: theme.spacing(3)
    },
    showMessageBox: {
        height: '79vh',
        
    },

}))

const ChatView = ({ socket, friend, msg ,updateReadMessage,chatIds:{activeChatId, rmsgId}}) => {
    const classes = useStyles();
    // console.log(activeChatId);
    // console.log( rmsgId);
    // if(activeChatId === rmsgId && activeChatId !== null){
    //     console.log(activeChatId);
    //     updateReadMessage(activeChatId);
    // }
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {friend.username}
                    </Typography> 
                </Toolbar>
            </AppBar>
            <div className={classes.root}>
                <Box className={classes.showMessageBox}>
                    {msg  && msg.messages.map((item, index) => {
                        return (
                            <Box className={item.sender === msg.userId ? classes.sender : classes.reciver} key={index}>
                                {item.message}
                            </Box>
                        )
                    })}

                </Box>
            </div>
            <ChatTextBox socket={socket} friendId={friend._id}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    msg: state.chat.messages,
    chatIds:state.chat
})

export default connect(mapStateToProps,{updateReadMessage})(ChatView);
