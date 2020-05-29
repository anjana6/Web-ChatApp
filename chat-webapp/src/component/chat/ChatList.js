import React from 'react';
import {connect} from 'react-redux';
import {List,ListItem,ListItemAvatar,Avatar,ListItemText, makeStyles} from '@material-ui/core';
import {Image} from '@material-ui/icons';
import {fetchMessages, joinChat} from '../../action/chatAction';

const useStyles = makeStyles((theme) =>({
   
      appBar: {
        flexGrow: 1,
      },
     
}))

const ChatList = ({chatList,fetchMessages,showPanel,joinChat}) => {
    const classes = useStyles();
    return (
        
        <List  >
          {
            chatList.map((item,index) =>{
              return(
                <ListItem button key={index} onClick={() => {fetchMessages(item.chatId);joinChat(item.chatId);showPanel(item.friendId.username)}}>
                  <ListItemAvatar>
                    <Avatar>
                      <Image />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={item.friendId.username} 
                    secondary={item.messages[item.messages.length-1].message} />
                </ListItem>
              )
            })
          }
      </List>
      
    )
}
const mapStateToProps = state => ({
  chatList: state.chat.chatlist
})

export default connect(mapStateToProps,{fetchMessages,joinChat})(ChatList);
