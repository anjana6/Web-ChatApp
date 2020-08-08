import React from 'react';
import {useDispatch} from 'react-redux';
import {ListItem, ListItemAvatar, Avatar, ListItemText, Divider} from '@material-ui/core';
import {FiberManualRecord} from '@material-ui/icons';

import { fetchChatMessage } from '../../action/chatAction';

const ChatLIstItem = ({item}) => {
  const dispatch = useDispatch()
  const {chatId,name,frdId} = item;
  const activeChat = {
    chatId:chatId,
    name:name,
    frdId:frdId
  }
    return (
        <>
          <ListItem button onClick={() =>dispatch(fetchChatMessage(activeChat))}>
            <ListItemAvatar>
              <Avatar>{item.name.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemText
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
