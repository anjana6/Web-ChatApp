const express = require('express');
const DBconnection = require('./config/db');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
const onlineChat = require('./router/onlineChat');


DBconnection();
const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', require('./router/auth'));
app.use('/api/v1/chat', require('./router/chat'));
onlineChat(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT,() =>{console.log(`Server is runing Port ${PORT}`)})