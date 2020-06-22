import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux';
import { Avatar, List, Divider, ListItem, ListItemText, makeStyles, ListItemAvatar} from '@material-ui/core';
import {fetchFriendList} from '../../action/chatAction';
import ShowGruopMember from './ShowGroupMember';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 350,
    },
}))


const NewGroup = ({friendList,fetchFriendList,socket,user}) => {
    const classes = useStyles();
    const [state, setState] = useState({members:[{_id:user._id,username:user.username}]});

    useEffect(() => {
        fetchFriendList()
    }, [fetchFriendList]);

    const addMember = (newMember) =>{
        setState({...state,members:[...state.members,newMember]})
    }

    
    
    return (
        <div className={classes.root} role="presentation" >
         <ShowGruopMember members={state.members} socket={socket}/>
            <List>
                {friendList.map((frnd, index) => (
                    <div key={index}>
                        <ListItem
                            button
                            onClick={() => {addMember(frnd)}}
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

const mapStateToProps = (state) => ({
    user: state.chat.user
})

export default connect(mapStateToProps,{fetchFriendList})(NewGroup);
