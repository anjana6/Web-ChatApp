const chatConnection = (io) => {

    io.on('connection', socket => {
        socket.on('Privetchat',({chatId}) =>{
            console.log(chatId)
        })
        console.log('user connect');
        // io.emit('message','user online');
        socket.emit('message', 'I am online');
        // socket.broadcast.emit('message', 'user online');
        // io.emit()
        socket.on('disconnect', () => {
            console.log('user disconnect');
            io.emit('message', 'user left');
        })
    
        socket.on('chatMessage', (message) => {
            console.log(message);
            io.emit('message', message);
        } );
    })
}

module.exports = chatConnection;