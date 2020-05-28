const express = require('express');
const DBconnection = require('./config/db');
const cors = require('cors');


DBconnection();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', require('./router/auth'));
app.use('/api/v1/chat', require('./router/chat'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,() =>{console.log(`Server is runing Port ${PORT}`)})