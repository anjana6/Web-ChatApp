import React,{useState,useEffect} from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:4000');

const App = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  

  useEffect(() => {
    let oldMessage = [];
        socket.on('message', (msg) => {
 
          oldMessage =  [...oldMessage, msg] ;
          setChat(oldMessage)
          
        });
    },[])
  

    // const onChange = (e) => {
    //     setMessage({
    //       ...state,e.target.value
    //     })
    //     // console.log(state.name);
    //     // console.log(state.message);

    // }

    const onSubmit = (e) => {
        e.preventDefault();
        socket.emit('chatMessage', message);
        setMessage('');
    }
    
    return (
      <div>
        <form>
          {/* <input type='text' name='name' value={state.name} onChange={onChange} /> */}
          <input type='text' name='message' value={message} onChange={(e) => setMessage(e.target.value)} />
          <input type='submit' onClick={onSubmit} />
        </form>
        <ul>
        {chat.map(msg => {
          return (
            <li>{msg}</li>
          )
        })}
        </ul>
      </div>
    );
}

export default App;