import React from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {ListItem, ListItemAvatar, Avatar, ListItemText, Divider,makeStyles} from '@material-ui/core';
import {FiberManualRecord} from '@material-ui/icons';

import { fetchChatMessage } from '../../action/chatAction';

const useStyles = makeStyles(()=>({
  username:{
      textTransform:"capitalize"
  }
}))

const ChatLIstItem = ({item}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const socket = useSelector(state => state.chat.socket);
  const {chatId,name,status} = item;
  const activeChat = {
    chatId:chatId,
    name:name,
    status: status
  }
  if(item.status === "p"){
    activeChat.frdId = item.frdId;
  }
    return (
        <>
          <ListItem button onClick={() =>{
            socket.emit('ACTIVE',{chatId});
            dispatch(fetchChatMessage(activeChat))
            }}>
            <ListItemAvatar>
              <Avatar>{item.name.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemText
              className={classes.username}
              primary={item.name}
              secondary={item.messages[item.messages.length - 1].message}
            />
            {item.unread && <div><FiberManualRecord/></div>}
          </ListItem>
        <Divider />     
        </>
    )
}

export default ChatLIstItem;
