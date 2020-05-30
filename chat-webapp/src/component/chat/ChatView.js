import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar,Toolbar,Typography} from '@material-ui/core';
import ShowChatPanel from './ShowChatPanel';
import ChatTextBox from './ChatTextBox';




const useStyles = makeStyles(()=>({
    root: {
        flexGrow: 1,
      },
    headertitle:{
        alignSelf:'center'
    },
    chatbox:{
      position:'absolute',
      bottom:5,
      // width:"100%"
    }
}))


const ChatView = ({panelname,paneluserId}) => {
    const classes = useStyles();
    return (
        <div className={classes.root} >
        <AppBar position="static">
        <Toolbar className={classes.headertitle}>
          <Typography variant="h6" >
           {panelname}
          </Typography>
        </Toolbar>
      </AppBar>
      <ShowChatPanel/>
      <ChatTextBox paneluserId={paneluserId}/>
      
        </div>
    )
}

export default ChatView
