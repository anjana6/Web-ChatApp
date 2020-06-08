import React, { useEffect} from 'react';
import { fetchFriendList,fetchChatMessage } from '../../action/chatAction';
import { connect } from 'react-redux';
import { Avatar, List, Divider, ListItem, ListItemText, makeStyles, ListItemAvatar, } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 350,
    },
}))

const FriendList = ({fetchFriendList,fetchChatMessage,friendList,setFriendId,user,toggleDrawer}) => {
    const classes = useStyles();
    useEffect(() => {
        fetchFriendList()
    }, [fetchFriendList])

    const getChatId = (friendId) => {
        const chatId =
            user._id > friendId ? `${friendId}&${user._id}` : `${user._id}&${friendId}`;
        return (chatId);
    }

    return (
        <div className={classes.root} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {friendList.map((frnd, index) => (
                    <div key={index}>
                        <ListItem
                            button
                            onClick={() => { setFriendId(frnd); fetchChatMessage(getChatId(frnd._id));}}
                            >
                            <ListItemAvatar>
                                <Avatar>
                                    {frnd.username.split("")[0]}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={frnd.username}
                            />
                        </ListItem>
                        <Divider />
                    </div>
                ))}
            </List>
        </div>
    )
}

const mapStateToProps = state => ({
    friendList: state.chat.friendlist,
    user: state.chat.user
})

export default connect(mapStateToProps,{fetchFriendList,fetchChatMessage})(FriendList);
