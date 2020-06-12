const Chat = require('../models/Chat');

let activatedChat = [];

const activeChat = (userId, chatId) => {
  const active = { userId, chatId }
  console.log('act',active);
  let foud = activatedChat.some(ele => ele.userId === userId);
  console.log(foud);
  if(foud){
   activatedChat = activatedChat.map(item => item.userId === userId? active : item)
  }else{
    activatedChat.push(active);
  }
  
  console.log(activatedChat);
}

const checkActivate = (userId,chatId) => {
  let found = activatedChat.some(ele => ele.userId === userId && ele.chatId === chatId);
  if(!found){
    return true
  }else{
    return false
  }
  // console.log(found);

}
  

const createMessage = (sender, text) => {
  const msg = {
    message: text,
    sender: sender,
  };
  return msg;
};


const senderChat = async (senderId,msg) => {
  const chat = await Chat.findOne({ userId:senderId, chatId:msg.chatId });
  if (!chat) {
    const newchat = new Chat({
      userId:senderId,
      chatId:msg.chatId,
      friendId:msg.friendId,
      messages: createMessage(senderId,msg.text)
    })
    await newchat.save()
    return await Chat.findOne({ userId: senderId, chatId: msg.chatId }).populate('friendId', ['username']);
  }
  chat.messages.push(createMessage(senderId, msg.text));
  chat.unread = false;
    return await chat.save();
}

const reciverChat =async (senderId,msg) => {
  const chat = await Chat.findOne({ userId: msg.friendId, chatId: msg.chatId });

  if (!chat) {
    const newchat = new Chat({
      userId: msg.friendId,
      chatId: msg.chatId,
      friendId: senderId,
      messages: createMessage(senderId, msg.text),
      unread: checkActivate(msg.friendId,msg.chatId)
    })
    await newchat.save();
    return await Chat.findOne({ userId: msg.friendId, chatId: msg.chatId }).populate('friendId', ['username']);

  }
  chat.messages.push(createMessage(senderId, msg.text));
  chat.unread = checkActivate(msg.friendId,msg.chatId);
  return await chat.save();
}

module.exports = {createMessage,senderChat,reciverChat,activeChat}