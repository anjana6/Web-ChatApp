const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const DBconnection = require('./config/db');

DBconnection();
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use('/api/v1/auth', require('./router/auth'));


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

const port = process.env.PORT || 4000;

app.listen(port,() => console.log(`Server Started port ${port}`));