import React, { useState } from 'react';
import { connect } from 'react-redux';

const ChatTextBox = ({ socket,friend,user }) => {
    const [state, setState] = useState({ text: '' });

    const getChatId = () => {
        const chatId =
            user._id > friend._id ? `${friend._id}&${user._id}` : `${user._id}&${friend._id}`;
        return(chatId);
    }

    const onSubmit = () => {
        const chatId = getChatId()
        const { text } = state;
        // console.log(friend);
        socket.emit('CHAT_MESSAGE', { chatId,friend,text });
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
