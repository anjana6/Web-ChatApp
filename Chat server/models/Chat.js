const mongoose = require('mongoose');
const { schema } = require('./User');
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
    name:{
        type:String,
    },
    frdId:{
        type:Schema.Types.ObjectId
    },
    users:[
        {
            _id:{
               type:Schema.Types.ObjectId
            },
            username:{
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
            }
        }
        
    ],
    unread:{
        type: Boolean,
        default:false
    },
    status: {
        type: String
    }
});



module.exports = mongoose.model('Chat',chatSchema);