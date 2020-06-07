import React, { useState } from 'react';
import { connect } from 'react-redux';

const ChatTextBox = ({ socket,friendId,user }) => {
    const [state, setState] = useState({ text: '' });

    const getChatId = () => {
        const chatId =
            user._id > friendId ? `${friendId}&${user._id}` : `${user._id}&${friendId}`;
        return(chatId);
    }

    const onSubmit = () => {
        const chatId = getChatId()
        const { text } = state;
        socket.emit('CHAT_MESSAGE', { chatId, text });
        setState({ ...state, text: '' });
    }
    return (
        <div>
            <input type="text" value={state.text} onChange={(e) => setState({ ...state, text: e.target.value })} />
            <button onClick={onSubmit}>submit</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.chat.user
})

export default connect(mapStateToProps)(ChatTextBox);
