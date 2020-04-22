import React,{useState,useEffect} from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

const App = () => {
    const [state, setState] = useState({ name: '', message: '' });
    const [chat,setChat] = useState('')

    useEffect(() => {
        socket.on('message', ({ name, message }) => {
          console.log(name, message);
          setChat(message);
          console.log(chat);
        });
        
    }, [])
    
    

    const onChange = (e) => {
        setState({
          ...state,[e.target.name]:e.target.value
        })
        // console.log(state.name);
        // console.log(state.message);

    }

    const onSubmit = (e) => {
        e.preventDefault();
        const { name, message } = state;
        //console.log(state);
        socket.emit('chatMessage', { name, message });
        //console.log(state);
        setState({message:''});
    }
    
    return (
      <div>
        <form>
          <input type='text' name='name' value={state.name} onChange={onChange} />
          <input type='text' name='message' value={state.message} onChange={onChange} />
          <input type='submit' onClick={onSubmit} />
        </form>
        <ul></ul>
      </div>
    );
}

export default App;