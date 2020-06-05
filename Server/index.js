const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const socketManeger = require('./socketManeger');
const DBconnection = require('./config/db');

DBconnection();

const app = express();
const server = http.createServer(app);
const io = socketio(server);
socketManeger(io);
app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', require('./router/auth'));
app.use('/api/v1/chat', require('./router/chat'));

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {console.log(`server running port ${PORT}`)});