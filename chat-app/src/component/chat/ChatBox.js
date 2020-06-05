import React,{useState} from 'react'

const ChatBox = ({socket}) => {
    const [state, setState] = useState({text:''})

    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(state);
        socket.emit('CHAT_MESSAGE', state.text);
        socket.on('MESSAGES',msg =>{
            console.log(msg)
        })
    
    }
   
    
    return (
        <div>
            <input type="text" onChange={(e) =>{setState({...state,text:e.target.value})}}/>
            <button onClick={onSubmit}>sumbit</button>
        </div>
    )
}

export default ChatBox;
