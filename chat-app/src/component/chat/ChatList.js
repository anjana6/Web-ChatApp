import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, makeStyles } from '@material-ui/core';
import { fetchChatMessage } from '../../action/chatAction';
import {FiberManualRecord} from '@material-ui/icons';
import PrivetListItem from './PrivetLIstItem';
import GroupListItem from './GroupListItem';



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
                {
                  (item.status === 'p')?
                    <PrivetListItem item={item} socket={socket} setFriendId={setFriendId} fetchChatMessage={fetchChatMessage}/>
                    :
                    <GroupListItem/>
          }
                {/* <ListItem
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
                <Divider /> */}
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
