import React,{Fragment,useEffect} from 'react';
import {connect} from 'react-redux';
import {List,ListItem,ListItemAvatar,Avatar,ListItemText,Typography,Divider, makeStyles,Paper} from '@material-ui/core';
import {fetchChatList,fetchChatMessage} from '../../action/chatAction';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 300,
        // maxWidth: '500px',
        // backgroundColor: theme.palette.background.paper,
        // // height:"100vh",
        // // overflow:'auto'
        // minWidth:'500px'
      },
      inline: {
        display: 'inline',
      },
}))

const ChatList = ({fetchChatList,fetchChatMessage,chat:{chatlist,user},onChat}) => {
    const classes = useStyles();

    useEffect(() => {
        fetchChatList()
    }, [fetchChatList]);
   
    return (
        <div className={classes.root}>
       
        <List >
          {
            chatlist.map((chatitem,index) => {
             const friendId = (chatitem.users.filter((item) =>(item.userId !== user._id))[0].userId)
              return(
                <Fragment key={index}>
                <ListItem alignItems="flex-start" onClick={() =>{onChat(friendId);fetchChatMessage(chatitem.chatId)}} button>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp">{chatitem.users.filter((item) =>(item.userId !== user._id))[0].username.split("")[0]}</Avatar>
                </ListItemAvatar>
                
                <ListItemText
                  primary={chatitem.users.filter((item) =>(item.userId !== user._id))[0].username}
                  secondary={
                    <Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {chatitem.messages[chatitem.messages.length-1].message}
                      </Typography>
                      
                    </Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              </Fragment>
              )
            })
          }

      </List>
     

        </div>
    )
}

const mapStateToProps = state =>({
  chat: state.chat
})

export default connect(mapStateToProps,{fetchChatList,fetchChatMessage})(ChatList);
