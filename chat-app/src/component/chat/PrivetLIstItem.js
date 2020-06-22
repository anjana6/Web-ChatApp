import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, makeStyles } from '@material-ui/core';
import {FiberManualRecord} from '@material-ui/icons';

const PrivetLIstItem = ({item,socket,setFriendId,fetchChatMessage}) => {
    return (
        <>
            <ListItem
                  button
                  onClick={() => {
                    setFriendId(item.friendId[0],item.chatId,item.status);
                    fetchChatMessage(item.chatId);
                    socket.emit('ACTIVE_CHAT', item.chatId)
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>{item.friendId[0].username.split('')[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.friendId[0].username}
                    secondary={item.messages[item.messages.length - 1].message}
                  />
                  {item.unread && <div><FiberManualRecord/></div>}
                </ListItem>
                <Divider />
             
        </>
    )
}

export default PrivetLIstItem
