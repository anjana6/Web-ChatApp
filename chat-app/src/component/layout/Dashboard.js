import React, { useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';

import { fetchChatList} from '../../action/chatAction';
import LeftChatView from './LeftChatView';
import RightChatView from './RightChatView';


const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        display: 'flex',
        float: "left"
    },
    leftView: {
        width: 350,
    },
    rightView:{
       backgroundColor:"yellow",
       width:"100%",
       height:"100vh"
    }

   
}))



const Dashboard = () => {
    const classes = useStyles();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchChatList())
    }, []);
   
    return (
       
        <div className={classes.root}>
            <div className={classes.leftView}>
                <LeftChatView/>
            </div>
            <div className={classes.rightView}>
                <RightChatView/>
            </div>
         </div>
         
    )
}


export default (Dashboard);


// const Dashboard = ({ fetchChatList, addNewMessage, user, activeChat }) => {
//     const [state, setState] = useState({ socket: null,status:null });
//     const [privet,setPrivet] = useState({friend:null,pChatId:null})
//     const [group,setGroup] = useState({name:null,gChatId:null})
//     const classes = useStyles();

   

//     useEffect(() => {
//         fetchChatList()
//         initialSocket()

//     }, [fetchChatList]);
   
//     const initialSocket = () => {
//         const socket = io.connect('http://localhost:5000', { query: { token: localStorage.token } });
//         setState({ ...state, socket: socket });
//         socket.emit('JOIN CHAT');
//         socket.on('MESSAGE', (msg) => {
//             console.log(msg);
//             addNewMessage(msg);
            
//         });
//     }
    
//     const setFriendId = (friend,chatId,status) => {
//         setState({ ...state,status:status });
//         setPrivet({friend:friend,pChatId:chatId});
//         console.log('frind');   
        
//     }

//     const Group = (chatId,status) => {
//         console.log(chatId,status);
//         setState({...state,status:status});
//         setGroup({...group,gChatId:chatId});
//     }
    
//     return (
       
//         <div className={classes.root}>
//             <div className={classes.leftBar}>
//                 <LeftChatListHeader setFriendId={setFriendId} socket={state.socket}/>
//                 <ChatList setFriendId={setFriendId} socket={state.socket} group={Group} />
//             </div>
//             <div className={classes.chatpanel}>
//             {/* {(state.status === 'p') ? 
//                 <ChatView socket={state.socket} friend={privet.friend} chatId={privet.chatId} status={state.status}/>
//                 :
//                <GroupChatView/> 
//             } */}
//             {(state.status === 'p')? <ChatView socket={state.socket} friend={privet.friend} chatId={privet.pChatId} status={state.status}/> :
//             <GroupChatView socket={state.socket} chatId={group.gChatId} status={state.status}/>}
//                 {/* {privet.friend && <ChatView socket={state.socket} friend={privet.friend} chatId={privet.chatId} status={state.status}/>} */}
//             </div>
            
           
//          </div>
         
//     )
// }

// const mapStateToProps = state => ({
//     user: state.chat.user,
//     activeChat: state.chat.activeChatId
// })

// export default connect(mapStateToProps, { fetchChatList, addNewMessage})(Dashboard);
