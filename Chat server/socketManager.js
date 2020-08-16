const jwt = require('jsonwebtoken');
const config = require('config');
const { v4: uuidv4 } = require('uuid');

const {checkChat,haveReciverChat,createSenderChat,
          createReciverChat,createGroupChat} = require('./utils/chatManager');
const {saveGroupMessage,saveMessage,removeActivatedChat} = require('./utils/messageManager');

var users = {};

const socketManager = (io) => {
     io.use(function (socket, next) {
       if (socket.handshake.query && socket.handshake.query.token) {
         jwt.verify(
           socket.handshake.query.token,
           config.get('jwtSecret'),
           function (err, decoded) {
             if (err) return next(new Error('Authentication error'));
             socket.user = decoded.user;
             next();
           }
         );
       } else {
         next(new Error('Authentication error'));
       }
     })
    .on('connection', (socket) => {
        console.log('connected');
        users[socket.user._id] = socket;
        socket.on('CHAT_MESSAGE',async msg => {
          const chatId = msg.chatId;
          const result = await checkChat(msg.chatId);
          const isOnline = users[msg.frdId];
            if(result == "2"){
              const message = await saveMessage(socket.user,msg);
              if(isOnline){
                users[msg.frdId].emit('MESSAGE',{message,chatId});
              }
              socket.emit('MESSAGE',{message,chatId});
            }

            if(result == "1"){
              const reciver = await haveReciverChat(msg.activeChatId,msg.frdId);
                if(reciver){
                  const message = await saveMessage(socket.user,msg);
                  users[msg.frdId].emit('MESSAGE',{message,chatId});
                  const newchat = await createSenderChat(socket.user,msg);
                  socket.emit('CHAT',newchat);
                }else{
                  const message = await saveMessage(socket.user,msg);
                  socket.emit('MESSAGE',message)
                  const newchat = await createReciverChat(socket.user,msg)
                  users[msg.frdId].emit('CHAT',newchat);
                }
            }

            if(result == "0"){
              const senderChat = await createSenderChat(socket.user,msg);
              const reciverChat = await createReciverChat(socket.user,msg);
              users[msg.frdId].emit('CHAT',reciverChat);
              socket.emit('CHAT',senderChat);
            }
      })

        socket.on('CREATE_GROUP',async (data) => {
          const chatId = uuidv4();
          const message = await createGroupChat(data.members,data.name,chatId,socket.user);
          data.members.map(mem =>{
            var id = users[mem.userId];
            if(id){
              users[mem.userId].emit('CHAT',message);
            }
          })
          socket.emit('CHAT',message);
        });

        socket.on('GROUP_MESSAGE',async msg =>{
          const chatId = msg.chatId
          const {message,members} = await saveGroupMessage(socket.user,msg);
          members.map(mem =>{
            var id = users[mem.userId];
            if(id){
              users[mem.userId].emit('MESSAGE',{message,chatId});
            } 
          });
          
        });

        socket.on('TYPING',(data) => {
          var id = users[data.frdId];
            if(id){
              users[data.frdId].emit('SEND', "typing...");
            } 
        })

        socket.on('disconnect', () => {
          console.log('disconnected');
          removeActivatedChat(socket.user._id);
        })
        
 })
}

module.exports = socketManager;