import React from 'react'
import {List,ListItem,ListItemAvatar,Avatar,ListItemText,IconButton, makeStyles,AppBar,Toolbar,} from '@material-ui/core';
import {Image,Add} from '@material-ui/icons'

const useStyles = makeStyles((theme) =>({
   
      appBar: {
        flexGrow: 1,
      },
     
}))

const ChatList = () => {
    const classes = useStyles();
    return (
        
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
      
    )
}

export default ChatList
