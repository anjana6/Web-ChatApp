const Chat = require('../models/Chat');

const createMessage = (sender, text) => {
  const msg = {
    message: text,
    sender: sender,
  };
  return msg;
};


const senderChat = async (senderId,msg) => {
  // console.log(userId,msg)
  const chat = await Chat.findOne({ userId:senderId, chatId:msg.chatId });
  if (!chat) {
    const newchat = new Chat({
      userId:senderId,
      chatId:msg.chatId,
      friendId:msg.friendId,
      messages: createMessage(senderId,msg.text)
    })
    await newchat.save()
    return await Chat.findOne({ userId: senderId, chatId: msg.chatId }).populate('friendId', ['username']).populate('userId', ['username']);
  }
  chat.messages.push(createMessage(senderId, msg.text));
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
      messages: createMessage(senderId, msg.text)
    })
    await newchat.save();
    return await Chat.findOne({ userId: senderId, chatId: msg.chatId }).populate('friendId', ['username']).populate('userId', ['username']);

  }
  chat.messages.push(createMessage(senderId, msg.text));
  return await chat.save();
}

module.exports = {createMessage,senderChat,reciverChat}