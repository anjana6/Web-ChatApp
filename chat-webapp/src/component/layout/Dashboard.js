import React from 'react';
import LeftChatBar from './LeftChatBar';
import ChatView from '../chat/ChatView';
import { makeStyles } from '@material-ui/core';
import Appbar from './Appbar';


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
       
          <Appbar/>
         
    )
}

export default Dashboard;
