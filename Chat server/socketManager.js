const jwt = require('jsonwebtoken');
const config = require('config');

const { createChatId } = require('./utils/chatManager');
const { createMessage, senderChat, reciverChat, saveActiveChat } = require('./utils/messageManager');

const socketManager = (io) => {
     io.use(function (socket, next) {
       if (socket.handshake.query && socket.handshake.query.token) {
         jwt.verify(
           socket.handshake.query.token,
           config.get('jwtSecret'),
           function (err, decoded) {
             if (err) return next(new Error('Authentication error'));

             socket.user = decoded.user;
             //    console.log(socket.user);
             next();
           }
         );
       } else {
         next(new Error('Authentication error'));
       }
     })
    .on('connection', (socket) => {
        console.log('connected');
        socket.on('JOIN CHAT', async() => {
            const chatIds =await createChatId(socket.user.id);
            chatIds.map((chatId) => {
                socket.join(chatId);
            });
          // socket.on('ACTIVE_CHAT', chatId => {
          //   saveActiveChat(socket.user.id,chatId)
          // });
          socket.on('CHAT_MESSAGE',async msg => {
            const chatId = msg.chatId
            const sendermessage = await senderChat(socket.user.id, msg);
            const recivermessage = await reciverChat(socket.user.id, msg);
            socket.emit('MESSAGE',sendermessage);
            socket.broadcast.to(chatId).emit('MESSAGE', recivermessage);
            })
        })
 })
}

module.exports = socketManager;