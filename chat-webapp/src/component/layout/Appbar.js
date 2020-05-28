import React,{useState,Fragment} from 'react';
import {AppBar,Toolbar,Avatar,IconButton,Drawer,List,Divider,ListItem,ListItemIcon,ListItemText,makeStyles} from '@material-ui/core';
import {Add,Inbox,Mail} from '@material-ui/icons';

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
            <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon>
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
