const Chat = require('../models/Chat');
const {senderchat,reciverchat} = require('../util/chat');

const createMessage = (text,sender) => {
    const msg = {
        message: text,
        sender:sender
    }
    return msg
};

const saveMessage = async (data,userId,chatId,message) =>{
    // console.log("da",data);
    // console.log('user',userId);
    // console.log('chatid',chatId);
    // console.log('msg',message);
    const userchat = await Chat.findOne({userId,chatId});
    const friendchat = await Chat.findOne({userId:data.friendId,chatId})
    // console.log(friendchat);
    if(!userchat){
        const newchat = senderchat(userId,chatId,data.friendId,message);
        // console.log(newchat);
        const chat = new Chat(newchat);
        // console.log(chat)
        await chat.save();
        // console.log(chat)
    }else{
        userchat.messages.push(message);
        await userchat.save();
    }

    if(!friendchat){
        const newchat = reciverchat(userId,chatId,data.friendId,message);
        // console.log(newchat);
        const chat = new Chat(newchat);
        // console.log(chat)
        await chat.save();
        // console.log(chat)
    }else{
        friendchat.messages.push(message);
        await friendchat.save()
    }


}

module.exports = {createMessage,saveMessage};