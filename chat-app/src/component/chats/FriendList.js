import React, { useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { List, makeStyles} from '@material-ui/core';

import { fetchFriendList} from '../../action/chatAction';
import FriendItem from './FriendItem';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 350,
    },
}))

const FriendList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const friendlist = useSelector(state => state.chat.friendlist)
    useEffect(() => {
       dispatch(fetchFriendList()) 
    }, [dispatch]);

    return (
        <div className={classes.root} role="presentation">
            <List>
                {friendlist.map((frnd) => (
                   <FriendItem item={frnd} key={frnd._id}/>
                ))}
            </List>
        </div>
    )
}



export default FriendList;
