const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupChatSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    chatId: {
        type:String,
        required:true
    },
    name: {
        type:String
    },
    users:[
        {
            userId:{
               type:Schema.Types.ObjectId
            },
            name:{
                type:String
            }
        }
    ],

    messages:[
        {
            message:{
                type:String,
            },
            sender:{
                type:String
            },
            time:{
                type:String
            }
        }
        
    ],
    unread:{
        type: Boolean,
        default:false
    },
    status:{
        type:String
    },
    time : { 
        type : Date, 
        default: Date.now() 
    }
});



module.exports = mongoose.model('GroupChat',groupChatSchema);