import React,{useState,Fragment} from 'react';
import { AppBar, Toolbar, Avatar, IconButton, Drawer, makeStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import FriendList from './FriendList';

const useStyles = makeStyles((theme) => ({
    addButton: {
        marginLeft: theme.spacing(25)
    }
}))

const LeftChatListHeader = ({setFriendId,socket}) => {
    const classes = useStyles();
    const [state, setState] = useState({ left: false });

    const toggleDrawer = (open) => (event) => {
        setState({ ...state, left: open });
    };

    // const showChatPanel = (name, userId) => {
    //     setPanel({ ...panel, showpanel: true, panelname: name, paneluserId: userId });
    // }

    return (
        <div>
            <AppBar position="static" >
                <Toolbar>
                    <Avatar>

                    </Avatar>
                    <IconButton edge="end" color="inherit" aria-label="menu" className={classes.addButton} onClick={toggleDrawer(true)} >
                        <Add />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Fragment>
                <Drawer anchor='left' open={state.left} onClose={toggleDrawer(false)}>
                    <FriendList setFriendId={setFriendId} toggleDrawer={toggleDrawer} socket={socket}/>
                    
                </Drawer>
            </Fragment>
        </div>
    )
}

export default LeftChatListHeader;
