import React,{useState,Fragment} from 'react';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { AppBar, Toolbar, Avatar, IconButton,Button,Typography,Drawer,Divider, makeStyles,useTheme, Tooltip } from '@material-ui/core';
import { Add,ChevronLeft,ChevronRight, ExitToApp, GroupAdd } from '@material-ui/icons';


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

const LeftChatListHeader = ({ onGroupCreated }) => {
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
                    <Tooltip title="Logout">
                      <IconButton color="inherit" component={Link} to="/" className={classes.space} onClick={() => { dispatch(logOut()) }}>
                        <ExitToApp />
                      </IconButton>
                    </Tooltip>
                   
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
                    <Tooltip title="Create New Group">
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<GroupAdd />}
                          onClick={handleGroupOpen}
                          style={{ margin: 12, borderRadius: 24, textTransform: 'none', fontWeight: 500, minWidth: 140 }}
                        >
                          New Group
                        </Button>
                      </div>
                    </Tooltip>
                    <Divider />   
                    <FriendList onDrawerClose={handleDrawerClose}/>
                </Drawer>
                <Drawer anchor='left' open={group}>
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleGroupClose}>
                            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                        </IconButton>
                    </div >
                    <Divider />
                    <div>
                        <GroupList onGroupCreated={() => {
                            handleGroupClose();
                            handleDrawerClose();
                            if (onGroupCreated) {
                                onGroupCreated();
                            }
                        }} />
                    </div>
                </Drawer>
            </Fragment>
        </div>
    )
}


export default LeftChatListHeader;



