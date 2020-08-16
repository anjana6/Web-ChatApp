const _ = require('lodash');
const Chat = require('../models/Chat');
const GroupChat = require('../models/GroupChat');


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
  
  const removeActivatedChat = (userId) => {
      activatedChat = _.reject(activatedChat, function(el) { return el.userId === userId; });
      
    }
  
  const checkActivatedChat = (userId,chatId) => {
      
      let found = activatedChat.some(ele => ele.userId === userId && ele.chatId === chatId);
    
      return chatactive = found? false : true;
      
    }
  

const createMessage = (sender, text) => {
    const msg = {
      message: text,
      sender: sender,
      time:new Date().toLocaleTimeString('en-GB', { hour: "numeric",minute: "numeric"})
    };
    return msg;
  };

const saveGroupMessage =async (sender,msg) =>{
  try {
    const chats = await GroupChat.find({chatId:msg.chatId});
    const members = chats[0].users;
    const message = createMessage(sender._id,msg.msg);
    if(chats){
      chats.map(async chat => {
        chat.messages.push(message);
        if(chat.userId != sender._id){
          console.log(chat.userId);
          chat.unread = checkActivatedChat(chat.userId,msg.chatId)
        }
       
        await chat.save();
      })
      return {message,members};
    } 
  } catch (err) {
    console.log(err)
  }   
  }

  const saveMessage = async (sender,msg) => {
    try {
      const chats = await Chat.find({chatId:msg.chatId});
      const message = createMessage(sender._id,msg.msg);
        chats.map(async chat => {
          chat.messages.push(message);
        if( chat.userId == sender._id){
          chat.unread = false;
        }else{
          chat.unread = checkActivatedChat(msg.frdId,msg.chatId);
        }
        
      await chat.save(); 
      })
      return message;
    } catch (err) {
      console.log(err)
    }
    
}
  
  module.exports = {
      saveGroupMessage,
      saveMessage,
      createMessage,
      activeChat,
      removeActivatedChat,
      checkActivatedChat
    }