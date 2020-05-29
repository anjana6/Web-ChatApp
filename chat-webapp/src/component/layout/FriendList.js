import React from 'react';
import {connect} from 'react-redux';
import {clearChatPanel} from '../../action/chatAction';
import {Avatar,List,Divider,ListItem,ListItemText,makeStyles,ListItemAvatar,} from '@material-ui/core';
import {Image} from '@material-ui/icons';

const useStyles = makeStyles((theme) =>({
    list: {
        width: 350,
      },
}))

const FriendList = ({friends,toggleDrawer,showPanel}) => {
    const classes = useStyles();
    return (
       <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {friends.map((frnd, index) => (
          <div key={index}>
          <ListItem button onClick={() =>{showPanel(frnd.username)}}>
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
    friends:state.chat.friends
  })

export default connect(mapStateToProps)(FriendList)
