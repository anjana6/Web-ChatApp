import React from 'react';
import ChatTextBox from './ChatTextBox';

const ChatView = ({socket}) => {
    return (
        <div>
            chatview
            <ChatTextBox socket={socket}/>
        </div>
    )
}

export default ChatView
