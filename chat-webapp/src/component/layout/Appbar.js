import React,{useState,Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {AppBar,Toolbar,Avatar,IconButton,Drawer,makeStyles} from '@material-ui/core';
import {Add} from '@material-ui/icons';
import {fetchFriendList,fetchChatList} from '../../action/chatAction';
import ChatList from '../chat/ChatList';
import ChatView from '../chat/ChatView';
import FriendList from './FriendList';

const useStyles = makeStyles((theme) =>({
  root:{
    width:"100%",
    display:'flex',
    float:"left"
},
  appBar:{
    width:350,
  },
  addButton:{
    marginLeft:theme.spacing(25)
}
  
}));

const Appbar = ({fetchFriendList,fetchChatList}) => {
  const classes = useStyles();
  const [state, setState] = useState({left: false});
  const [panel,setPanel] = useState({showpanel:false,panelname:''});

  useEffect(() => {
    fetchFriendList()
    fetchChatList()
  }, [fetchFriendList,fetchChatList])

  const toggleDrawer = (open) => (event) => {
    setState({ ...state,left: open });
  };

  const showChatPanel = (name) =>{
    setPanel({...panel,showpanel:true,panelname:name});
  }

  

  return (
    <div className={classes.root}>
      <div>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Avatar>

            </Avatar>
            <IconButton edge="end" className={classes.addButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <Add/>
            </IconButton>
          </Toolbar>
        </AppBar>
    
        <Fragment>
          <Drawer anchor='left' open={state.left} onClose={toggleDrawer(false)}>
            <FriendList toggleDrawer={toggleDrawer} showPanel={showChatPanel} />
          </Drawer>
        </Fragment>
        <ChatList showPanel={showChatPanel} />
      </div>
       
        {panel.showpanel &&
          <ChatView panelname={panel.panelname}/>
        }
      
    </div>
  );
}

const mapStateToProps = state => ({
  friends:state.chat.friends
})

export default connect(mapStateToProps,{fetchFriendList,fetchChatList})(Appbar);
