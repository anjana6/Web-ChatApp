import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Avatar,Divider, ListItem, ListItemText,ListItemAvatar, } from '@material-ui/core';

import {fetchChatMessage} from '../../action/chatAction';

const FriendItem = ({item}) => {
    const user = useSelector(state => state.chat.user);
    const dispatch = useDispatch();
     
    const {username,_id} = item;
    const activeChat = {
        chatId: user._id > _id ? `${_id}&${user._id}` : `${user._id}&${_id}`,
        name:username,
        frdId:_id
      }
    
    return (
        <div >
            <ListItem button onClick={() => dispatch(fetchChatMessage(activeChat))}>
                <ListItemAvatar>
                    <Avatar>
                        {item.username.charAt(0)}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.username}/>
            </ListItem>
            <Divider />
        </div>
    )
}

export default FriendItem;
