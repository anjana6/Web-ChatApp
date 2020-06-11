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
  
  // if(activatedChat.length === 0){
  //   activatedChat.push(active);
  // }else{
  //   activatedChat.map(item => item.id === userId? active : item)
  // }
  

  console.log(activatedChat);
}
  
  
//   console.log(activatedChat);
// }

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
  // console.log(chat);
  if (!chat) {
    const newchat = new Chat({
      userId: msg.friendId,
      chatId: msg.chatId,
      friendId: senderId,
      messages: createMessage(senderId, msg.text),
      unread: true
    })
    await newchat.save();
    return await Chat.findOne({ userId: msg.friendId, chatId: msg.chatId }).populate('friendId', ['username']);

  }
  chat.messages.push(createMessage(senderId, msg.text));
  chat.unread = true;
  return await chat.save();
}

module.exports = {createMessage,senderChat,reciverChat,activeChat}