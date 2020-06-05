const jwt = require('jsonwebtoken');
const config = require('config');

const {createMessage,saveMessage,getMessage} = require('../util/message');
const {userJoin,getCurrentUser} = require('../util/users');

let room;

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
        console.log('user connect aa');
        socket.on('GET_CHATMESSAGE',async (chatId) => {
            console.log(chatId);
            const messages = await getMessage(socket.user.id,chatId);
            console.log('hoo',room);
            socket.emit('CHAT_MESSAGES',messages);
        });

        socket.on('JOINCHAT',chatId =>{
            console.log('roo1',room);
            console.log(chatId);
            socket.leave(room);
            socket.join(chatId);
            room = chatId;
            console.log('roo',room);
            socket.on('NEW_MESSAGE',msg =>{
                console.log(msg);
                console.log(chatId);
                io.to(chatId).emit('ONE_MESSAGE',msg);
            })

            socket.on('disconnect', () => {
                console.log("disnnect");
            })
        });
        // console.log(socket.id);
        // socket.on('joinchat',async (chatId) =>{
        //     console.log(chatId);
        //     socket.room = chatId;
        //     socket.join(chatId);
        //     console.log('first');
        //     socket.broadcast.to(chatId).emit('status','I am online');
        //     socket.on('chatMessage',async (msg)=>{
        //         // console.log(msg);
        //         const message = createMessage(msg.text,msg.userId);
        //         //saveMessage(msg,socket.user.id,chatId,message)

        //         io.to(msg.chatId).emit('message',message);
        //     })
           
            
        // });

        // socket.on("new room", (data) => {
        //     console.log(socket.room);
        //     socket.leave(socket.room);
        //     console.log(data);
        //     socket.join(data);
        //     console.log('sencond');
        //     socket.on('chatMessage',async (msg)=>{
        //         // console.log(msg);
        //         const message = createMessage(msg.text,msg.userId);
        //         //saveMessage(msg,socket.user.id,chatId,message)

        //         io.to(msg.chatId).emit('message',message);
        //     })
        // })
       
       
        // socket.on('joinchat', (chatId) =>{
        //     console.log(socket.id);
        //     const user = userJoin(socket.id,socket.user.id,chatId)
        //     socket.join(user.room);
        //     socket.broadcast.to(user.room).emit('message',`${user.username}`);

        //     socket.on('disconnect', () => {
        //         console.log("disnnect");
        //     })
            
        // });
        // socket.on('disconnect', () => {
        //     console.log("disnnect");
        // })
    })


}

module.exports = onlineChat;