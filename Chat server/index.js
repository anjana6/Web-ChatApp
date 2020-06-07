const express = require('express');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');
const DBconnection = require('./config/db');
const socketManager = require('./socketManager');


DBconnection();
const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', require('./router/auth'));
app.use('/api/v1/chat', require('./router/chat'));
socketManager(io);

const PORT = process.env.PORT || 5000;


server.listen(PORT, () => { console.log(`Server started on port ${PORT}`) });