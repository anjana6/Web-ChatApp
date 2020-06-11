import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, makeStyles } from '@material-ui/core';
import { fetchChatMessage } from '../../action/chatAction';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
}));

const ChatList = ({ chatList,setFriendId,fetchChatMessage,socket }) => {
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
                  {item.unread && <div>N</div>}
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

export default connect(mapStateToProps,{fetchChatMessage})(ChatList);
