import React, { useState } from 'react';
import { connect } from 'react-redux';

const ChatTextBox = ({ socket,friend,user,chatId,status }) => {
    const [state, setState] = useState({ text: '' });

    // const getChatId = () => {
    //     const chatId =
    //         user._id > friend._id ? `${friend._id}&${user._id}` : `${user._id}&${friend._id}`;
    //     return(chatId);
    // }
    // console.log(chatId);

    const onSubmit = () => {
        // const chatId = chatId
        const { text } = state;
        console.log('send');
        socket.emit('CHAT_MESSAGE', { chatId,friend,text,status });
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
