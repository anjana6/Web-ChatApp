import React from 'react'
import {List,ListItem,ListItemAvatar,Avatar,ListItemText,IconButton, makeStyles,AppBar,Toolbar,} from '@material-ui/core';
import {Image,Add} from '@material-ui/icons'

const useStyles = makeStyles((theme) =>({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
      appBar: {
        flexGrow: 1,
      },
      addButton:{
          marginLeft:theme.spacing(25)
      }
}))

const ChatList = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.appBar}>
         <AppBar position="static">
            <Toolbar>
            <Avatar>

            </Avatar>
            <IconButton edge="end" className={classes.addButton} color="inherit" aria-label="menu">
            <Add/>
          </IconButton>
            </Toolbar>
      </AppBar>
      </div>
        <List  >
        <ListItem button>
          <ListItemAvatar>
            <Avatar>
              <Image />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
        <ListItem button>
          <ListItemAvatar>
            <Avatar>
            <Image />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Work" secondary="Jan 7, 2014" />
        </ListItem>
        <ListItem button>
          <ListItemAvatar>
            <Avatar>
            <Image />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Vacation" secondary="July 20, 2014" />
        </ListItem>
      </List>
      </div>
    )
}

export default ChatList
