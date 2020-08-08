import React from 'react';
import {useSelector } from 'react-redux';
import { Box,makeStyles,AppBar,Toolbar,Typography } from '@material-ui/core';

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
    const active = useSelector(state => state.chat.activeChat);
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {active.name}
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
        </div>
    )
}



export default MessageView;
