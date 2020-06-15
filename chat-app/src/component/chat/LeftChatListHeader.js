import React,{useState,Fragment} from 'react';
import {connect} from 'react-redux';
import { AppBar, Toolbar, Avatar, IconButton, Drawer, makeStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import FriendList from './FriendList';
import NewGroup from './NewGroup';

const useStyles = makeStyles((theme) => ({
    addButton: {
        marginLeft: theme.spacing(5)
    },
    
}))

const LeftChatListHeader = ({setFriendId,socket,friendList,user}) => {
    const classes = useStyles();
    const [state, setState] = useState({ left: false,top:false });

    const friendListDrawer = (open) => (event) => {
        setState({ ...state, friendlist: open });
    };

    const newGroupDrawer = (open) => (event) =>{
        setState({...state, newgroup:open})
    }

    // const showChatPanel = (name, userId) => {
    //     setPanel({ ...panel, showpanel: true, panelname: name, paneluserId: userId });
    // }

    return (
        <div>
            <AppBar position="static" >
                <Toolbar>
                    <Avatar>

                    </Avatar>
                    <IconButton edge="end" color="inherit" aria-label="menu" className={classes.addButton} onClick={newGroupDrawer(true)} >
                        G
                    </IconButton>
                    <IconButton edge="end" color="inherit" aria-label="menu" className={classes.addButton} onClick={friendListDrawer(true)} >
                        <Add />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Fragment>
                <Drawer anchor='left' open={state.friendlist} onClose={friendListDrawer(false)}>
                    <FriendList 
                        setFriendId={setFriendId} 
                        toggleDrawer={friendListDrawer} 
                        socket={socket} 
                        friendList={friendList} 
                        user={user}
                        />
                    
                </Drawer>
            </Fragment>
            <Fragment>
                <Drawer anchor='left' open={state.newgroup} onClose={newGroupDrawer(false)} >
                    <NewGroup
                        friendList={friendList} 
                        socket={socket} 
                    />    
                </Drawer>
            </Fragment>
        </div>
    )
}

const mapStateToProps = state => ({
    friendList: state.chat.friendlist,
    user: state.chat.user
});

export default connect(mapStateToProps)(LeftChatListHeader);
