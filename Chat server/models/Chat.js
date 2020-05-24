const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    chatId: {
        type:String,
        required:true
    },
    message:{
        type:String,
    }
});

module.exports = mongoose.model('Chat',chatSchema);