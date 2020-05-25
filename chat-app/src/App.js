import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

import Home from './component/layout/Home';
import Register from './component/auth/RegisterForm'
import Dashboard from './component/chat/Dashboard';
// import io from 'socket.io-client';

// const socket = io.connect('http://localhost:4000');

const App = () => {
  return(
    <Router>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/register' component={Register}/>
      <Route exact path='/dashboard' component={Dashboard}/>
    </Switch>
  </Router>
  )
  
  // const [message, setMessage] = useState('');
  // const [chat, setChat] = useState([]);
  

  // useEffect(() => {
  //   let oldMessage = [];
  //       socket.on('message', (msg) => {
 
  //         oldMessage =  [...oldMessage, msg] ;
  //         setChat(oldMessage)
          
  //       });
  //   },[])


  //   const onSubmit = (e) => {
  //       e.preventDefault();
  //       socket.emit('chatMessage', message);
  //       setMessage('');
  //   }
    
  //   return (
  //     <div>
  //       <form>
  //         <input type='text' name='name' value={state.name} onChange={onChange} />
  //         <input type='text' name='message' value={message} onChange={(e) => setMessage(e.target.value)} />
  //         <input type='submit' onClick={onSubmit} />
  //       </form>
  //       <ul>
  //       {chat.map(msg => {
  //         return (
  //           <li>{msg}</li>
  //         )
  //       })}
  //       </ul>
  //     </div>
    // );

}

export default App;