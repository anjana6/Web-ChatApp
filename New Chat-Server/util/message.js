const Chat = require('../models/Chat');

const getMessages =async (userId,chatId) =>{
    console.log(userId);
    try {
        const messages =await Chat.findOne({userId,chatId}).populate('friendId',['username']).populate('userId',['username']);
        // console.log(chatlist);
        
        return  messages;

    } catch (err) {
        console.log(err);
       
    }
}

module.exports = {getMessages};