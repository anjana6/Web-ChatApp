import React from 'react';
import {connect} from 'react-redux';
import {fetchMessages,joinChat} from '../../action/chatAction';
import {Avatar,List,Divider,ListItem,ListItemText,makeStyles,ListItemAvatar,} from '@material-ui/core';
import {Image} from '@material-ui/icons';

const useStyles = makeStyles((theme) =>({
    list: {
        width: 350,
      },
}))

const FriendList = ({users:{friends,user},toggleDrawer,showPanel,fetchMessages,joinChat}) => {
    const classes = useStyles();

    const getChatId = (userId,friendId) =>{
      const chatId = (userId>friendId)?  friendId.concat(userId):  userId.concat(friendId);
      return chatId;
    }

    return (
       <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {friends.map((frnd, index) => (
          <div key={index}>
          <ListItem 
            button 
            onClick={() =>{
              showPanel(frnd.username,frnd._id);
              fetchMessages(getChatId(frnd._id,user._id));
              joinChat(getChatId(frnd._id,user._id))
              }}>
          <ListItemAvatar>
            <Avatar>
              <Image />
            </Avatar>
          </ListItemAvatar>
          <ListItemText 
            primary={frnd.username} 
         />
        </ListItem>
        <Divider />
        </div>
        ))}
      </List>
    </div>
    )
}

const mapStateToProps = state => ({
    users:state.chat
  })

export default connect(mapStateToProps,{fetchMessages,joinChat})(FriendList)
