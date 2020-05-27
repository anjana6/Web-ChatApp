const Chat = require('./models/Chat');

const chatConnection = (io) => {

    io.on('connection', socket => {
        socket.on('Privetchat',async ({chatId}) =>{
            // console.log(chatId);
            socket.join(chatId);
            try {
                const chatmessages = await Chat.findOne({chatId:chatId});
    
                socket.emit('chatmessages',chatmessages);
            } catch (error) {
                
            }
            

           

            socket.broadcast.to(chatId).emit('message', 'I am online');

            socket.on('chatMessage', (message) => {
                console.log(message);
                io.emit('message', message);
            } );

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