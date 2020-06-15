const Chat = require('../models/Chat');
const _ = require('lodash');


let activatedChat = [];

const activeChat = (userId, chatId) => {
  const active = { userId, chatId }

  let foud = activatedChat.some(ele => ele.userId === userId);
 
  if(foud){
   activatedChat = activatedChat.map(item => item.userId === userId? active : item)
  }else{
    activatedChat.push(active);
  }
  
 
}

const removeActiveChat = (userId) => {
  activatedChat = _.reject(activatedChat, function(el) { return el.userId === userId; });
  
}

const checkActivate = (userId,chatId) => {
  let found = activatedChat.some(ele => ele.userId === userId && ele.chatId === chatId);

  return chatactive = found? false : true;
  

}
  

const createMessage = (sender, text) => {
  const msg = {
    message: text,
    sender: sender,
  };
  return msg;
};


const senderChat = async (sender,msg) => {

  const chat = await Chat.findOne({ userId:sender._id, chatId:msg.chatId });

  if (!chat) {
    const newchat = new Chat({
      userId:sender._id,
      chatId:msg.chatId,
      friendId:msg.friend,
      messages: createMessage(sender._id,msg.text)
    })
  
    return await newchat.save()
   
  }
  chat.messages.push(createMessage(sender._id, msg.text));
  chat.unread = false;
  return await chat.save();
}

const reciverChat =async (sender,msg) => {
  const chat = await Chat.findOne({ userId: msg.friend._id, chatId: msg.chatId });

  if (!chat) {
    const newchat = new Chat({
      userId: msg.friend._id,
      chatId: msg.chatId,
      friendId: sender,
      messages: createMessage(sender._id, msg.text),
      unread: checkActivate(msg.friend._id,msg.chatId)
    })
 
    return await newchat.save();
    

  }
  chat.messages.push(createMessage(sender._id, msg.text));
  chat.unread = checkActivate(msg.friend._id,msg.chatId);
  return await chat.save();
}

module.exports = {createMessage,senderChat,reciverChat,activeChat,removeActiveChat}