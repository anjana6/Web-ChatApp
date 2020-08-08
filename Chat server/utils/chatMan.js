const Chat = require('../models/Chat');
const { removeUser } = require('./chatManager');
const User = require('../models/User');

const checkChat =async (chatId) => {
    console.log(chatId)
    const chat = await Chat.find({chatId})
    console.log(chat.length);
    if(chat.length == 2){
        return "2";
    }
    if(chat.length == 1){
        return "1";
    }
    if(chat.length == 0){
        return "0";
    }
}

const checkReciver = async (chatId,reciverId) => {
    //console.log(chatId,reciverId)
    const chat = await Chat.findOne({chatId,userId:reciverId});
    console.log(chat);
    if(chat) return true;

    return false;
}


const createMessage = (sender, text) => {
    const msg = {
      message: text,
      sender: sender,
    };
    return msg;
  };
  

const saveMessage = async (sender,msg) => {
    const chats = await Chat.find({chatId:msg.chatId});
    //console.log(chats);
    const message = createMessage(sender._id,msg.msg);
      chats.map(chat => {
        chat.messages.push(message)
        chat.save(); 
    })
    return message;
}

const createSenderChat = async(sender,msg) => {
    // const frdname = await User.findById(msg.frdId).select('username')
    // console.log(frdname);
    const newChat = new Chat({
        userId: sender._id,
        chatId: msg.chatId,
        frdId:msg.frdId,
        name:msg.name,
        messages:createMessage(sender._id,msg.msg),
        unread:false
    })
    newChat.save();
    return newChat;
}

const createReciverChat = async(sender,msg) => {
    //console.log(sender)
    const newChat = new Chat({
        userId: msg.frdId,
        chatId: msg.chatId,
        frdId:sender._id,
        name:sender.username,
        messages:createMessage(sender._id,msg.msg),
        unread:false
    })
    newChat.save();
    return newChat;
}

module.exports = {checkChat,saveMessage,checkReciver,createSenderChat,createReciverChat};