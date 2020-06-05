const Chat = require('../models/Chat');
const {senderchat,reciverchat} = require('../util/chat');

const createMessage = (text,sender) => {
    const msg = {
        message: text,
        sender:sender
    }
    return msg
};

const getMessage =async (userId,chatId) => {
    // console.log(userId);
    const messages = await Chat.findOne({userId,chatId});
    return messages;
}

const saveMessage = async (data,userId,chatId,message) =>{
  
    const userchat = await Chat.findOne({userId,chatId});
    const friendchat = await Chat.findOne({userId:data.friendId,chatId});

    if(!userchat){
        const newchat = senderchat(userId,chatId,data.friendId,message);
        const chat = new Chat(newchat);
        await chat.save();
    }else{
        userchat.messages.push(message);
        await userchat.save();
    }

    if(!friendchat){
        const newchat = reciverchat(userId,chatId,data.friendId,message);
        const chat = new Chat(newchat);
        await chat.save();  
    }else{
        friendchat.messages.push(message);
        await friendchat.save()
    }


}

module.exports = {createMessage,saveMessage,getMessage};