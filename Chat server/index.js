const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io= socketio(server);

io.on('connection', socket => {
    
    socket.emit('message', 'welcome to charCard');
    socket.broadcast.emit('message', 'A user has joined the chat');
    // io.emit()
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    })

    socket.on('chatMessage', ({name,message}) => {
        console.log({name,message});
        io.emit('message', {name,message});
    } );
})

const port = process.env.PORT || 4000;

server.listen(port,() => console.log(`Server Started port ${port}`));