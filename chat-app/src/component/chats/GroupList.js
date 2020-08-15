import React, {useState, Fragment} from 'react';
import {useSelector} from 'react-redux';
import { Avatar, List,Drawer,TextField,IconButton,Typography,Chip, Divider, ListItem, ListItemText, makeStyles, ListItemAvatar,Button, useTheme } from '@material-ui/core';
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
        let found = members.some(ele => ele.userId === userId);
        if(!found){
            setMembers([...members,user])
        }
       
    }

    const onCreateGroup = () => {
        socket.emit('CREATE_GROUP',{members,name});
    }

    const handleDelete = (userId) => {
        setMembers(members.filter(user => user.userId !== userId));
    }

    return (
        <div className={classes.root} role="presentation">
            <div>
                {members.map((item,index) => {
                    return(
                        <Fragment key={index}>
                            <Chip
                                avatar={<Avatar>{item.name.charAt(0)}</Avatar>}
                                label={item.name}
                                onDelete={() => handleDelete(item.userId)}
                            />
                            
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
