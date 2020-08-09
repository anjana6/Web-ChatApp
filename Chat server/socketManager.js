const jwt = require('jsonwebtoken');
const config = require('config');
const { v4: uuidv4 } = require('uuid');

const { createChatId,onlineUsers,removeUser } = require('./utils/chatManager');
const { createMessage, senderChat, reciverChat, activeChat,removeActiveChat,createGroupChat,saveGroupMessage } = require('./utils/messageManager');
const {checkChat,saveMessage,checkReciver,createSenderChat,createReciverChat} = require('./utils/chatMan');
const socketManager = (io) => {
     io.use(function (socket, next) {
       if (socket.handshake.query && socket.handshake.query.token) {
         jwt.verify(
           socket.handshake.query.token,
           config.get('jwtSecret'),
           function (err, decoded) {
             if (err) return next(new Error('Authentication error'));
             socket.user = decoded.user;
                // console.log(socket.user);
             next();
           }
         );
       } else {
         next(new Error('Authentication error'));
       }
     })
    .on('connection', (socket) => {
        console.log('connected');
       const onlineuser = onlineUsers(socket.id,socket.user);
      //  console.log(onlineuser);
       //******************************************************************* */
        // socket.on('JOIN CHAT', async() => {
        //     const chatIds =await createChatId(socket.user._id);
        //     //console.log(chatIds);
        //     chatIds.map((chatId) => {
        //         socket.join(chatId);
        //     });

        //   socket.on('CHAT_MESSAGE',async msg => {
        //    console.log('fi',msg);
        //    checkChat(msg.chatId);
        //     // const chatId = msg.chatId;
        //     // console.log(msg.chatId);
        //     // console.log(onlineuser);
        //     const user = onlineuser.find(usr => usr.Id === msg.friend._id);
           
        //     const sendermessage = await senderChat(socket.user, msg);
        //     const recivermessage = await reciverChat(socket.user, msg);
        //     //console.log(user.socketId);
        //     socket.emit('MESSAGE',sendermessage);
        //     if(user){
        //       io.to(user.socketId).emit('MESSAGE', recivermessage);
        //     }
            
        //     });

        //   socket.on('ACTIVE_CHAT', chatId =>{
        //     activeChat(socket.user._id,chatId);
        //   })
          
           
        // })
//****************************************************************************************** */

    socket.on('CHAT_MESSAGE',async msg => {
     console.log('fi',msg);
    const result = await checkChat(msg.chatId);
    console.log(result);
        if(result == "2"){
          const message =await saveMessage(socket.user,msg);
          //console.log(message);
          const user = onlineuser.find(usr => usr.Id == msg.frdId);
          //console.log(user.socketId);
          if(user){
            io.to(user.socketId).emit('MESSAGE',message);
          }
                
          socket.emit('MESSAGE',message);
        }
        if(result == "1"){
          const reciver = await checkReciver(msg.activeChatId,msg.frdId);
          if(reciver){
            console.log('true')
            const message = await saveMessage(socket.user,msg);
            const newchat = await createSenderChat(socket.user,msg)
          }else{
            console.log('false');
            const message = await saveMessage(socket.user,msg);
            socket.emit('MESSAGE',message)
            const newchat = await createReciverChat(socket.user,msg)
            const user = onlineuser.find(usr => usr.Id == msg.frdId );
            if(user){
              io.to(user.socketId).emit('CHAT',newchat); 
            }
          }
        }

        if(result == "0"){
          const senderChat = await createSenderChat(socket.user,msg);
          // console.log('sen',senderChat);
          const reciverChat = await createReciverChat(socket.user,msg);
          // console.log('re',reciverChat);
          const user = onlineuser.find(usr => usr.Id == msg.frdId );
          if(user){
            console.log(user.username);
            console.log(user.socketId);
            io.to(user.socketId).emit('CHAT',reciverChat); 
          }
          socket.emit('CHAT',senderChat);

        }

      


      })
        socket.on('CREATE_GROUP',async (data) => {
          //console.log(data);
          const chatId = uuidv4();
          //console.log(data.members);
          const msg = await createGroupChat(data.members,data.name,chatId,socket.user);
        //  console.log(msg);
          data.members.map(mem =>{
            //console.log(mem.userId)
            const user = onlineuser.find(usr => usr.Id == mem.userId);
            console.log("ur",user);
            if(user){
              console.log('hai');
              console.log(user.socketId)
             io.to(user.socketId).emit('CHAT',msg);
            }
            
          })
          socket.emit('CHAT',msg);
         
         
        });

        socket.on('GROUPCHAT_MESSAGE',async msg =>{
           console.log(msg);
          const {message,members} = await saveGroupMessage(socket.user,msg);
          
          console.log(members);
          
          for(let i = 0; i < members.length;i++){
            for(let j =0; j < onlineuser.length; j++){
              if(members[i]._id == onlineuser[j].Id ){
                console.log('now')
                console.log(onlineuser[j]);
                io.to(onlineuser[j].socketId).emit('MESSAGE',message);
              }
            }
          }

        })

        socket.on('disconnect', () => {
          console.log('disconnected');
          removeActiveChat(socket.user._id);
          removeUser(socket.id);
        })
        
 })
}

module.exports = socketManager;