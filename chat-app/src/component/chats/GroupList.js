import React, {useState, Fragment} from 'react';
import {useSelector} from 'react-redux';
import { Avatar, List, Dialog, DialogContent, DialogActions, TextField, IconButton, Typography, Chip, Divider, ListItem, ListItemText, makeStyles, ListItemAvatar, Button, useTheme } from '@material-ui/core';
import {Send, Close} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 350,
    },
    dialogTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        minHeight: '64px',
        width: '100%',
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    dialogTitleText: {
        flex: 1,
        marginRight: theme.spacing(2),
        textAlign: 'left',
    },
    dialogCloseButton: {
        marginLeft: 'auto',
        flexShrink: 0,
        padding: '8px',
    },
    dialogContent: {
        minWidth: 300,
    },
}))

const FriendList = ({ onGroupCreated }) => {
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
        if (onGroupCreated) {
            onGroupCreated();
        }
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
            <Button variant="contained" color="primary" fullWidth endIcon={<Send/>} onClick={handleDrawerOpen} style={{ marginTop: 12, borderRadius: 24, fontWeight: 500, textTransform: 'none' }}>
                CREATE GROUP
            </Button>
            <Dialog open={open} onClose={handleDrawerClose} aria-labelledby="create-group-dialog">
                <div className={classes.dialogTitle}>
                    <Typography variant="h6" className={classes.dialogTitleText}>
                        Create New Group
                    </Typography>
                    <IconButton 
                        onClick={handleDrawerClose} 
                        size="small"
                        className={classes.dialogCloseButton}
                    >
                        <Close />
                    </IconButton>
                </div>
                <DialogContent className={classes.dialogContent}>
                    <TextField 
                        id="group-name" 
                        label="Group Name" 
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={(e)=> setName(e.target.value)}
                        placeholder="Enter group name..."
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDrawerClose} color="primary">
                        Cancel
                    </Button>
                    <Button 
                        onClick={() => {onCreateGroup();handleDrawerClose()}} 
                        color="primary" 
                        variant="contained"
                        disabled={name.length < 4}
                        startIcon={<Send/>}
                    >
                        Create Group
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}



export default FriendList;
