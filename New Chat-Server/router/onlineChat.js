const jwt = require('jsonwebtoken');
const config = require('config');

const {getMessages} = require('../util/message');

const onlineChat = (io) => {
    io.use(function(socket,next){
        if(socket.handshake.query && socket.handshake.query.token){
            jwt.verify(socket.handshake.query.token,config.get('jwtSecret'),function(err,decoded){
               if(err) return next(new Error('Authentication error'));
               
               socket.user = decoded.user;
            //    console.log(socket.user);
               next();
            });
        }else {
            next(new Error('Authentication error'));
        }
    })
    .on('connection', socket =>{
        console.log('user connect');
        socket.on('joinchat',async (chatId) =>{
            console.log(chatId)
            // console.log(socket.user.id);
            // const chatmessages =await getMessages(socket.user.id,chatId);
            // socket.emit('chatmessages',chatmessages);
            // console.log('ee',chatlist);

        })
    })


}

module.exports = onlineChat;