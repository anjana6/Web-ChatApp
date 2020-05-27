const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    chatId: {
        type:String,
        required:true
    },
    friendId:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
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