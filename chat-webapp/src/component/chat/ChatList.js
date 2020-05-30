import React from 'react';
import {connect} from 'react-redux';
import {List,ListItem,ListItemAvatar,Avatar,ListItemText} from '@material-ui/core';
import {fetchMessages, joinChat,fetchChatList} from '../../action/chatAction';


const ChatList = ({chatList,fetchMessages,showPanel,joinChat,fetchChatList}) => {
    
    return (
        
        <List  >
          {
            chatList.map((item,index) =>{
              return(
                <ListItem 
                  button 
                  key={index} 
                  onClick={
                    () => {
                      fetchMessages(item.chatId);
                      joinChat(item.chatId);
                      showPanel(item.friendId.username,item.friendId._id);
                      fetchChatList()
                    }
                    }>
                  <ListItemAvatar>
                    <Avatar>
                      {item.friendId.username.split("")[0]}
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

export default connect(mapStateToProps,{fetchMessages,joinChat,fetchChatList})(ChatList);
