import React,{useState,Fragment} from 'react';
import {useSelector} from 'react-redux';
import { AppBar, Toolbar, Avatar, IconButton, Drawer,Divider,ListItemAvatar,ListItemText,ListItem, makeStyles,useTheme } from '@material-ui/core';
import { Add,ChevronLeft,ChevronRight } from '@material-ui/icons';

import FriendList from '../chats/FriendList';
import GroupList from '../chats/GroupList';

const useStyles = makeStyles((theme) => ({
    addButton: {
        marginLeft: theme.spacing(5)
    },
    
}))

const LeftChatListHeader = () => {
    const classes = useStyles();
    const theme = useTheme();
    const user = useSelector(state => state.chat.user)
    const[group,setGroup] = useState(false);
    const [open, setOpen] = React.useState(false);
    

    const handleDrawerOpen = () => {
        setOpen(true);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
      };

      const handleGroupOpen = () => {
          console.log('group')
        setGroup(true);
      };
    
      const handleGroupClose = () => {
        setGroup(false);
      };

    return (
        <div>
            <AppBar position="static" >
                <Toolbar>
                    <Avatar></Avatar>
                    <IconButton edge="end" color="inherit" aria-label="menu" className={classes.addButton} >
                        {user && user.username.toUpperCase()}
                    </IconButton>
                    <IconButton edge="end" color="inherit" aria-label="menu" className={classes.addButton} onClick={handleDrawerOpen}>
                        <Add />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Fragment>
                <Drawer anchor='left' open={open}>
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                        </IconButton>
                    </div >
                    <Divider />
                    <ListItem button onClick={handleGroupOpen}>
                        <ListItemAvatar>
                            <Avatar></Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="New Group"
                        />
                    </ListItem>
                    <Divider />   
                    <div onClick={handleDrawerClose}>
                        <FriendList/>
                    </div>
                </Drawer>
                <Drawer anchor='left' open={group}>
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleGroupClose}>
                            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                        </IconButton>
                    </div >
                    <Divider />
                    <div>
                        <GroupList/>
                    </div>
                </Drawer>
            </Fragment>
        </div>
    )
}


export default LeftChatListHeader;



