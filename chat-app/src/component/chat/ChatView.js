import React from 'react';
import ChatTextBox from './ChatTextBox';

const ChatView = ({socket,friend}) => {
    return (
        <div>
            chatview
            <ChatTextBox socket={socket} friendId={friend._id}/>
        </div>
    )
}

export default ChatView
