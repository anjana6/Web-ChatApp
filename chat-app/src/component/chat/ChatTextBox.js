import React,{useState,useEffect} from 'react'

const ChatTextBox = ({ socket }) => {
    const [state, setState] = useState({ text: '' });

    useEffect(() => {
        console.log(socket);
        
    }, [])
    // console.log(socket)

    const onSubmit = () => {
        const chatId = '5ece9c2ccfc90f416048bbfe&5ece9c43cfc90f416048bc00';
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

export default ChatTextBox;
