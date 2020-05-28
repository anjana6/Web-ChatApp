import React from 'react';
import LeftChatBar from './LeftChatBar';
import ChatView from './ChatView';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(()=>({
    root:{
        width:"100%",
        display:'flex',
        float:"left"
    }
}))

const Dashboard = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
          <LeftChatBar/>
          <ChatView/>
        </div>
    )
}

export default Dashboard;
