const jwt = require('jsonwebtoken');
const config = require('config');
const { v4: uuidv4 } = require('uuid');

const { createChatId,onlineUsers,removeUser } = require('./utils/chatManager');
const { createMessage, senderChat, reciverChat, activeChat,removeActiveChat,createGroupChat } = require('./utils/messageManager');

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
        //console.log(socket.id);
       const onlineuser = onlineUsers(socket.id,socket.user);
       console.log(onlineuser);
        socket.on('JOIN CHAT', async() => {
            const chatIds =await createChatId(socket.user._id);
            //console.log(chatIds);
            chatIds.map((chatId) => {
                socket.join(chatId);
            });

          socket.on('CHAT_MESSAGE',async msg => {
           console.log('fi',msg);
            // const chatId = msg.chatId;
            // console.log(msg.chatId);
            // console.log(onlineuser);
            const user = onlineuser.find(usr => usr.Id === msg.friend._id);
           
            const sendermessage = await senderChat(socket.user, msg);
            const recivermessage = await reciverChat(socket.user, msg);
            //console.log(user.socketId);
            socket.emit('MESSAGE',sendermessage);
            if(user){
              io.to(user.socketId).emit('MESSAGE', recivermessage);
            }
            
            });

          socket.on('ACTIVE_CHAT', chatId =>{
            activeChat(socket.user._id,chatId);
          })
          
           
        })

        socket.on('GROUP_CHAT',async (members) => {
          const chatId = uuidv4();
          // console.log(members);
          const msg = await createGroupChat(members,chatId,socket.user);
         console.log(msg);
          members.map(mem =>{
            const user = onlineuser.find(usr => usr.Id === mem._id);
            //console.log("ur",user.socketId);
            if(!!user){
              console.log(user.socketId)
             io.to(user.socketId).emit('MESSAGE',msg);
            }
            
          })
         
         
        });

        socket.on('GROUPCHAT_MESSAGE',msg =>{
          console.log(msg);
        })

        socket.on('disconnect', () => {
          console.log('disconnected');
          removeActiveChat(socket.user._id);
          removeUser(socket.id);
        })
        
 })
}

module.exports = socketManager;