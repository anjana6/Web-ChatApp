// import React,{useState,Fragment} from 'react';
// import {connect} from 'react-redux';
// import { AppBar, Toolbar, Avatar, IconButton, Drawer, makeStyles } from '@material-ui/core';
// import { Add } from '@material-ui/icons';

// // import FriendList from './FriendList';
// // import NewGroup from './NewGroup';1

// import FriendList from '../chats/FriendList';

// const useStyles = makeStyles((theme) => ({
//     addButton: {
//         marginLeft: theme.spacing(5)
//     },
    
// }))

// const LeftChatListHeader = ({setFriendId,socket,friendList,user}) => {
//     const classes = useStyles();
//     const [state, setState] = useState({ left: false,top:false });

//     const friendListDrawer = (open) => (event) => {
//         setState({ ...state, friendlist: open });
//     };

//     // const newGroupDrawer = (open) => (event) =>{
//     //     setState({...state, newgroup:open})
//     // }

//     // const showChatPanel = (name, userId) => {
//     //     setPanel({ ...panel, showpanel: true, panelname: name, paneluserId: userId });
//     // }

//     return (
//         <div>
//             <AppBar position="static" >
//                 <Toolbar>
//                     <Avatar>

//                     </Avatar>
//                     {/* <IconButton edge="end" color="inherit" aria-label="menu" className={classes.addButton} onClick={newGroupDrawer(true)} >
//                         G
//                     </IconButton> */}
//                     <IconButton edge="end" color="inherit" aria-label="menu" className={classes.addButton} onClick={friendListDrawer(true)} >
//                         <Add />
//                     </IconButton>
//                 </Toolbar>
//             </AppBar>
//             <Fragment>
//                 <Drawer anchor='left' open={state.friendlist} onClose={friendListDrawer(false)}>
//                     <FriendList/>
//                     {/* <FriendList 
//                         setFriendId={setFriendId} 
//                         toggleDrawer={friendListDrawer} 
//                         socket={socket} 
//                         friendList={friendList} 
//                         user={user}
//                         /> */}
                    
//                 </Drawer>
//             </Fragment>
//             {/* <Fragment>
//                 <Drawer anchor='left' open={state.newgroup} onClose={newGroupDrawer(false)} >
//                     <NewGroup
//                         friendList={friendList} 
//                         socket={socket} 
//                     />    
//                 </Drawer>
//             </Fragment> */}
//         </div>
//     )
// }


// export default LeftChatListHeader;

import React,{useState,Fragment} from 'react';
import { AppBar, Toolbar, Avatar, IconButton, Drawer,Divider,ListItemAvatar,ListItemText,ListItem, makeStyles,useTheme } from '@material-ui/core';
import { Add,ChevronLeft,ChevronRight } from '@material-ui/icons';

// import FriendList from './FriendList';
// import NewGroup from './NewGroup';1

import FriendList from '../chats/FriendList';
import GroupList from '../chats/GroupList';

const useStyles = makeStyles((theme) => ({
    
    addButton: {
        marginLeft: theme.spacing(5)
    },
    
}))

const LeftChatListHeader = ({setFriendId,socket,friendList,user}) => {
    const classes = useStyles();
    const theme = useTheme();
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
                        G
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



