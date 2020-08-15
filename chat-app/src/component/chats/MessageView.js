import React from 'react';
import {useSelector } from 'react-redux';
import { Box,makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
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

const MessageView = () => {
    const classes = useStyles();
    const msg = useSelector(state => state.chat.messages);
    const user = useSelector(state => state.chat.user);
    return (
        <div>
            <div className={classes.root}>
                <Box className={classes.showMessageBox}>
                    {msg  && msg.map((item, index) => {
                        return (
                                <div className={item.sender === user._id ? classes.sender : classes.reciver} key={index}>
                                    <Box>{item.message}</Box>
                                </div>
                               
                        )
                    })}
                </Box>
            </div>
        </div>
    )
}



export default MessageView;
