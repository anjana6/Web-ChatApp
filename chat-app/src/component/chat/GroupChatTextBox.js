import React, { useState } from 'react';
import { connect } from 'react-redux';

const GroupChatTextBox = ({ socket,chatId,status }) => {
    const [state, setState] = useState({ text: '' });
console.log('group')
    const onSubmit = () => {
        const { text } = state;
        console.log('send');
        socket.emit('GROUPCHAT_MESSAGE', { chatId,text,status });
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

export default (GroupChatTextBox);
