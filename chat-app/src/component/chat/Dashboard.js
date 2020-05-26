import React,{useState} from 'react'
import io from 'socket.io-client';

import ChatList from './ChatList';
import ChatView from './ChatView';
// import ChatTextBox from './ChatTextBox';
import { Grid, makeStyles,Box ,Paper} from '@material-ui/core';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

const socket = io.connect('http://localhost:4000');

socket.on('message',message => {
    console.log(message);
})

const useStyles = makeStyles(()=>({
   chatview:{
       float:"left",
   },
   chatlist:{
       width:'300px'
   },
   root:{
       display:"flex"
   }

}))

const Dashboard = () => {
    const classes = useStyles();
    const [state,setState] = useState({onChatView:false,friendId:''})

    const onChatView = (friendId) =>{
        setState({...state,onChatView:true,friendId:friendId})
       
    }

    console.log(state);
    return (
        // <Grid container>
            
        //         <Grid item className={classes.chatlist} xs={4}>
        //             <Paper>
        //             <ChatList onChat={onChat}/>
        //             </Paper>
               
        //         </Grid>
        //         <Grid item xs={8}>
        //             <Paper>
        //             {chatview &&
        //          <ChatView />
        //          }
        //             </Paper>

               
        //         </Grid>
            
            
        // </Grid>
        <div className={classes.root}>
            <div className={classes.chatlist}>
            <ChatList onChat={onChatView}/>
            </div>
            <div className={classes.chatview}>
            {state.onChatView &&<ChatView friendId={state.friendId}/>}
            </div>
        </div>
        

    )
}

export default Dashboard
