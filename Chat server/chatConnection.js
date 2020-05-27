const Chat = require('./models/Chat');

const chatConnection = (io) => {

    io.on('connection', socket => {
        socket.on('Privetchat',async ({chatId}) =>{
            // console.log(chatId);
            socket.join(chatId);
            try {
                socket.broadcast.to(chatId).emit('online', 'I am online');
                const chatmessages = await Chat.findOne({chatId:chatId});
                
    
                socket.emit('chatmessages',chatmessages);

                socket.on('chatMessage',async (message) => {
                    console.log(message);
                    const chat = await Chat.findOne({chatId:chatId});
                    // console.log(chat);
                    const msg = {
                        message:message.msg,
                        reciver:message.friendId,
                        sender:message.sender
                    }
                    // console.log(msg);
                    chat.messages.push(msg);
            
                    const chatmessage = await chat.save();
                    console.log(chatmessage);
                    
                    io.to(chatId).emit('chatmessages',chatmessage);
                } );

            } catch (error) {
                
            }
            

           

            

            

            socket.on('disconnect', () => {
                console.log('user disconnect');
                io.emit('message', 'user left');
            })
        })
        console.log('user connect');
        // io.emit('message','user online');
       
        // socket.broadcast.emit('message', 'user online');
        // io.emit()
        
    
        
    })
}

module.exports = chatConnection;