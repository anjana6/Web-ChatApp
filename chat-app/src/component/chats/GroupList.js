import React, {useState, Fragment} from 'react';
import {useSelector} from 'react-redux';
import { Avatar, List,Drawer,TextField,IconButton,Typography, Divider, ListItem, ListItemText, makeStyles, ListItemAvatar,Button, useTheme } from '@material-ui/core';
import {Send,ChevronLeft,ChevronRight} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 350,
    },
}))

const FriendList = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [members, setMembers] = useState([]);
    const [name,setName] = useState('');
    const friendlist = useSelector(state => state.chat.friendlist);
    const socket = useSelector(state => state.chat.socket);
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
      };


    const addUser = (username,userId) => {
        const user = {name:username,userId:userId}
        setMembers([...members,user])
    }

    const onCreateGroup = () => {
        console.log(members);
        socket.emit('CREATE_GROUP',{members,name});
    }

    return (
        <div className={classes.root} role="presentation">
            <div>
                {members.map((item,index) => {
                    return(
                        <Fragment key={index}>
                            {item.name}
                        </Fragment>    
                    )
                })}
            </div>
            <List>
            <Divider/>
                {friendlist.map((frnd) => (
                    <Fragment key={frnd._id}>
                        <ListItem button onClick={() => addUser(frnd.username,frnd._id)} >
                            <ListItemAvatar>
                                <Avatar>{frnd.username.charAt(0)}</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={frnd.username}/>
                        </ListItem>
                        <Divider />
               </Fragment>
                ))}
            </List>
            <Button variant="contained" color="primary" fullWidth endIcon={<Send/>} onClick={handleDrawerOpen}>
                CREAT
            </Button>
            <Drawer anchor='left' open={open} >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                    </IconButton>
                </div >
                <Divider />
                <Typography className={classes.root}>
                    New Group
                </Typography>
                <TextField id="standard-basic" label="GroupName" onChange={(e)=> setName(e.target.value)}/>
                {name.length > 4 && <Button onClick={() => {onCreateGroup();handleDrawerClose()}}><Send/></Button>}
                
            </Drawer>

        </div>
    )
}



export default FriendList;
