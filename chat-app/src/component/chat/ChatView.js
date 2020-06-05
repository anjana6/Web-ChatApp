import React from 'react'
import ChatBox from './ChatBox';

const ChatView = ({socket}) => {
    return (
        <div>
            <div>message</div>
            <ChatBox socket={socket}/>
        </div>
    )
}

export default ChatView
