import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, makeStyles } from '@material-ui/core';
import {FiberManualRecord} from '@material-ui/icons';

const GroupListItem = ({item,group}) => {
    return (
        <>
            <ListItem
                  button
                  onClick={() => {
                    group(item.chatId,item.status);
                    // fetchChatMessage(item.chatId);
                    // socket.emit('ACTIVE_CHAT', item.chatId)
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>{}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="je"
                    secondary={item.messages[item.messages.length - 1].message}
                  />
                  {item.unread && <div><FiberManualRecord/></div>}
                </ListItem>
                <Divider />
             
        </>
    )
}

export default GroupListItem
