import React from 'react';
import { Box,makeStyles } from '@material-ui/core';
import ChatTextBox from './ChatTextBox';
import { connect } from 'react-redux';

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

const ChatView = ({ socket, friend,msg }) => {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.root}>
                <Box className={classes.showMessageBox}>
                    {msg && msg.messages.map((item, index) => {
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
    msg: state.chat.messages
})

export default connect(mapStateToProps)(ChatView);
