import React,{useState,Fragment} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {AppBar,Toolbar,Avatar,IconButton} from '@material-ui/core';
import {Add} from '@material-ui/icons';

const useStyles = makeStyles((theme) =>({
  list: {
    width: 350,
  },
  appBar:{
    width:350,
  },
  addButton:{
    marginLeft:theme.spacing(25)
}
  
}));

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = useState({left: false});

  const toggleDrawer = (open) => (event) => {
    setState({ ...state,left: open });
  };

  const list = () => (
    <div
    className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
            <Avatar>

            </Avatar>
            <IconButton edge="end" className={classes.addButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <Add/>
          </IconButton>
            </Toolbar>
      </AppBar>
    
        <Fragment>
          <Drawer anchor='left' open={state.left} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
        </Fragment>
      
    </div>
  );
}
