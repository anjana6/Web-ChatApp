import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Avatar,Divider, ListItem, ListItemText,ListItemAvatar,makeStyles } from '@material-ui/core';

import {fetchChatMessage} from '../../action/chatAction';

const useStyles = makeStyles(()=>({
    username:{
        textTransform:"capitalize"
    }
}))

const FriendItem = ({item}) => {
    const user = useSelector(state => state.chat.user);
    const dispatch = useDispatch();
    const classes = useStyles();
     
    const {username,_id} = item;
    const activeChat = {
        chatId: user._id > _id ? `${_id}&${user._id}` : `${user._id}&${_id}`,
        name:username,
        frdId:_id,
        status: "p"
      }
    
    return (
        <div >
        <ListItem button onClick={() => { dispatch(fetchChatMessage(activeChat))}}>
                <ListItemAvatar>
                    <Avatar>
                        {item.username.charAt(0)}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.username} className={classes.username}/>
            </ListItem>
            <Divider />
        </div>
    )
}

export default FriendItem;
