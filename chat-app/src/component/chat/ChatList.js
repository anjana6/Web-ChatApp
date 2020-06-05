import React from 'react';
import {connect} from 'react-redux';
import {fetchChatMessage} from '../../action/chatAction';

const ChatList = ({chatlist,socket,fetchChatMessage}) => {
    return (
        <div>
            <ul>
            {
               chatlist.map((chat,index) => {
                   return(
                   <li key={index} onClick={() =>{fetchChatMessage(socket,chat.chatId)}}>{chat.friendId.username}</li>
                   )
               })
           }
            </ul>
          
        </div>
    )
}

const mapStateToProps = state =>({
    chatlist: state.chat.chatlist
})

export default connect(mapStateToProps,{fetchChatMessage})(ChatList);
