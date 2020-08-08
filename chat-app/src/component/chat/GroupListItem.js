import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, makeStyles } from '@material-ui/core';
import {FiberManualRecord} from '@material-ui/icons';
import {fetchGroupMessage} from '../../action/chatAction';
import { connect } from 'react-redux';

const GroupListItem = ({item,group,fetchGroupMessage,socket}) => {
  // console.log(item.status)
    return (
        <>
            <ListItem
                  button
                  onClick={() => {
                    group(item.chatId,item.status);
                    fetchGroupMessage(item.chatId);
                    socket.emit('ACTIVE_CHAT', item.chatId)
                  }}
                >
                  <ListItemAvatar>
                    {(item.name )? <Avatar>{item.name.charAt(0)}</Avatar> : <Avatar>G</Avatar> }
                  </ListItemAvatar>
                  <ListItemText
                    primary= {(item.name)? item.name : "New Group"}
                    secondary={item.messages[item.messages.length - 1].message}
                  />
                  {item.unread && <div><FiberManualRecord/></div>}
                </ListItem>
                <Divider />
             
        </>
    )
}

export default connect(null,{fetchGroupMessage})(GroupListItem);
