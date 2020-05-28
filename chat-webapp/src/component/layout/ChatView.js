import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
        </div>
    )
}

export default ChatView
