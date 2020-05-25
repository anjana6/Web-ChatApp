const express = require('express');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
const DBconnection = require('./config/db');
const chatConnection = require('./chatConnection');



DBconnection();
const app = express();

const server = http.createServer(app);
const io = socketio(server);
// io.origins('*:*');

app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', require('./router/auth'));
chatConnection(io);
app.use('/api/v1/chat', require('./router/chat'));

const port = process.env.PORT || 4000;

server.listen(port,() => console.log(`Server Started port ${port}`));