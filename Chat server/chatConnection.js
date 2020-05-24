const chatConnection = (io) => {

    io.on('connection', socket => {
        console.log('user connect');
        // socket.emit('message', 'welcome to charCard');
        socket.broadcast.emit('message', 'A user has joined the chat');
        // io.emit()
        socket.on('disconnect', () => {
            console.log('user disconnect');
            io.emit('message', 'A user has left the chat');
        })
    
        socket.on('chatMessage', (message) => {
            console.log(message);
            io.emit('message', message);
        } );
    })
}

module.exports = chatConnection;