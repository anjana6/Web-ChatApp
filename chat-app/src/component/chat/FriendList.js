import React, { useEffect} from 'react';
import { fetchFriendList } from '../../action/chatAction';
import { connect } from 'react-redux';
import { Avatar, List, Divider, ListItem, ListItemText, makeStyles, ListItemAvatar, } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 350,
    },
}))

const FriendList = ({fetchFriendList,friendList,setFriendId}) => {
    const classes = useStyles();
    useEffect(() => {
        fetchFriendList()
    }, [fetchFriendList])

    
    return (
        <div className={classes.root}>
            <List>
                {friendList.map((frnd, index) => (
                    <div key={index}>
                        <ListItem
                            button
                            onClick={() => { setFriendId(frnd) }}
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
    friendList: state.chat.friendlist
})

export default connect(mapStateToProps,{fetchFriendList})(FriendList);
