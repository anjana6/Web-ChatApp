import React,{useState,Fragment} from 'react';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { AppBar, Toolbar, Avatar, IconButton,Button,Typography,Drawer,Divider,ListItemAvatar,ListItemText,ListItem, makeStyles,useTheme } from '@material-ui/core';
import { Add,ChevronLeft,ChevronRight} from '@material-ui/icons';


import FriendList from '../chats/FriendList';
import GroupList from '../chats/GroupList';
import {logOut} from '../../action/authAction';

const useStyles = makeStyles((theme) => ({
    addButton: {
        marginLeft: theme.spacing(1)
    },
    space:{
        marginLeft: theme.spacing(2)
    }
    
}))

const LeftChatListHeader = () => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
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
                    <Typography className={classes.space}>{user && user.username.toUpperCase()}</Typography>
                    <IconButton edge="end" color="inherit"  className={classes.addButton} onClick={handleDrawerOpen}>
                        <Add />
                    </IconButton>
                    <Button color="inherit" component={Link} to="/" className={classes.space}  onClick={() =>{dispatch(logOut())}}>LogOut</Button>
                   
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



