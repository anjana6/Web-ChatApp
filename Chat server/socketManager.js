const jwt = require('jsonwebtoken');
const config = require('config');

const { createChatId } = require('./utils/chatManager');
const { createMessage } = require('./utils/messageManager');

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
            // console.log('hoo');
            const chatIds =await createChatId(socket.user.id);
            // console.log(chatIds);
            chatIds.map((chatId) => {
                // console.log(chatId);
                socket.join(chatId);
            });
            socket.on('CHAT_MESSAGE', msg => {
                const message = createMessage(socket.user.id,msg.text)
                io.to(msg.chatId).emit('MESSAGE',message)
            })
        })
 })
}

module.exports = socketManager;