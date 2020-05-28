import React from 'react';
import {connect} from 'react-redux';
import {List,ListItem,ListItemAvatar,Avatar,ListItemText, makeStyles} from '@material-ui/core';
import {Image} from '@material-ui/icons';
import {fetchMessages} from '../../action/chatAction';

const useStyles = makeStyles((theme) =>({
   
      appBar: {
        flexGrow: 1,
      },
     
}))

const ChatList = ({chatList,fetchMessages}) => {
    const classes = useStyles();
    return (
        
        <List  >
          {
            chatList.map((item,index) =>{
              return(
                <ListItem button key={index} onClick={() => fetchMessages(item.userId._id,item.chatId)}>
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

export default connect(mapStateToProps,{fetchMessages})(ChatList);
