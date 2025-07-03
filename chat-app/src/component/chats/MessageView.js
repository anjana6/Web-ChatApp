import React,{useRef,useEffect} from 'react';
import {useSelector } from 'react-redux';
import { Box,makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default
    },
    sender: {
        backgroundColor: '#7fabff',
        color: theme.palette.text.primary,
        maxWidth: '80vw',
        minWidth: '48px',
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        margin: theme.spacing(1, 0),
        borderRadius: theme.spacing(3),
        wordBreak: 'break-word',
        fontSize: 16,
        alignSelf: 'flex-end',
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '90vw',
            minWidth: '40px',
            padding: 12,
            fontSize: 15,
        },
    },
    reciver: {
        backgroundColor: '#b1fea8',
        color: theme.palette.text.primary,
        maxWidth: '80vw',
        minWidth: '48px',
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        margin: theme.spacing(1, 0),
        borderRadius: theme.spacing(3),
        wordBreak: 'break-word',
        fontSize: 16,
        alignSelf: 'flex-start',
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '90vw',
            minWidth: '40px',
            padding: 12,
            fontSize: 15,
        },
    },
    showMessageBox: {
        height: '79vh',
        overflow: "auto",
        padding: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(0.5),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(0.5),
        },
    },
    messageRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: '100%',
    },
    messageText: {
        flex: 1,
        wordBreak: 'break-word',
    },
    time: {
        alignSelf: 'flex-end',
        fontSize: 10,
        opacity: 0.55,
        color: '#e0e0e0',
        marginLeft: 8,
        [theme.breakpoints.down('sm')]: {
            fontSize: 9,
        },
    }

}))

const MessageView = () => {
    const classes = useStyles();
    const el = useRef(null);
    const msg = useSelector(state => state.chat.messages);
    const user = useSelector(state => state.chat.user);

      useEffect(() => {
        const container = el.current;
        container.scrollTo(0,container.scrollHeight); 
      }, [msg])

    return (
        <div>
            <div className={classes.root}>
                <Box className={classes.showMessageBox} ref={el} >
                    {msg  && msg.map((item, index) => {
                        return (
                                <div  className={item.sender === user._id ? classes.sender : classes.reciver} key={index}>
                                    <div className={classes.messageRow}>
                                        <Box className={classes.messageText}>{item.message}</Box>
                                        <div className={classes.time}>{item.time}</div>
                                    </div>
                                </div>
                        )
                    })}
                </Box>
            </div>
        </div>
    )
}



export default MessageView;
