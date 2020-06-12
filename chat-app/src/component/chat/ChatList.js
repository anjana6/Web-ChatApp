import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, makeStyles } from '@material-ui/core';
import { fetchChatMessage,updateReadMessage } from '../../action/chatAction';
import {FiberManualRecord} from '@material-ui/icons';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
}));

const ChatList = ({ chatList,setFriendId,fetchChatMessage,socket,updateReadMessage }) => {
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <List>
          {chatList.map((item, index) => {
            return (
              <Fragment key={index}>
                <ListItem
                  button
                  onClick={() => {
                    setFriendId(item.friendId);
                    fetchChatMessage(item.chatId);
                    // updateReadMessage(item.chat)
                    socket.emit('ACTIVE_CHAT', item.chatId)
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>{item.friendId.username.split('')[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.friendId.username}
                    secondary={item.messages[item.messages.length - 1].message}
                  />
                  {item.unread && <div><FiberManualRecord/></div>}
                </ListItem>
                <Divider />
              </Fragment>
            );
          })}
        </List>
      </div>
    );
}

const mapStateToProps = state => ({
    chatList : state.chat.chatlist
})

export default connect(mapStateToProps,{fetchChatMessage,updateReadMessage})(ChatList);
