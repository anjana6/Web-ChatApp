const jwt = require('jsonwebtoken');
const config = require('config');

const { createChatId } = require('./utils/chatManager');

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
        socket.on('JOIN CHAT', () => {
            // console.log('hoo');
            createChatId(socket.user.id);
        })
 })
}

module.exports = socketManager;