const jwt = require('jsonwebtoken');
const config = require('config');

const {createMessage,saveMessage} = require('../util/message');

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
            // console.log(chatId)
            socket.join(chatId);
            socket.broadcast.to(chatId).emit('status','I am online');
            socket.on('chatMessage',async (msg)=>{
                // console.log(socket.user.id)
                const message = createMessage(msg.text,msg.userId);
                saveMessage(msg,socket.user.id,chatId,message)

                io.to(chatId).emit('message',message);
            })

        })
    })


}

module.exports = onlineChat;