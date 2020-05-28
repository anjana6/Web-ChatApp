import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar,Toolbar,Typography} from '@material-ui/core';
import ShowChatPanel from '../chat/ShowChatPanel';



const useStyles = makeStyles(()=>({
    root: {
        flexGrow: 1,
      },
    headertitle:{
        alignSelf:'center'
    }
}))


const ChatView = () => {
    const classes = useStyles();
    return (
        <div className={classes.root} >
        <AppBar position="static">
        <Toolbar className={classes.headertitle}>
          <Typography variant="h6" >
            News
          </Typography>
        </Toolbar>
      </AppBar>
      <ShowChatPanel/>
        </div>
    )
}

export default ChatView
