import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { List, makeStyles } from '@material-ui/core';


import PrivetListItem from './ChatLIstItem';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 350,
  },
}));

const ChatList = () => {
    const classes = useStyles();
    const chatList = useSelector(state => state.chat.chatlist);
    
    
    return (
      <div className={classes.root}>
        <List>
          {chatList.map((item, index) => {
            return (
              <Fragment key={item._id}>
                    <PrivetListItem item={item}/> 
              </Fragment>
            );
          })}
        </List>
      </div>
    );
}



export default ChatList;


