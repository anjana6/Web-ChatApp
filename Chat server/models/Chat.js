const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    chatId: {
        type:String,
        required:true
    },
    users:[{
        userId:{
            type:String,
        },
        username:{
            type:String
        }
    }],
    messages:[
        {
            message:{
                type:String,
            },
            sender:{
                type:String
            },
            reciver:{
                type:String
            }
        }
        
    ]
});



module.exports = mongoose.model('Chat',chatSchema);