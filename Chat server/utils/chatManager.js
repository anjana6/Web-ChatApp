const User = require('../models/User');
const _ = require('lodash');

let users = [];

const createChatId = async (userId) => {
    const chatIds = [];
    //console.log(userId);
    const usersId = await User.find().select(['_id']); 
    usersId.map((item, index) => {
        const friendId = item._id
        const chatId =
            userId > friendId ? `${friendId}&${userId}` : `${userId}&${friendId}`;
        chatIds.push(chatId);
    })
    // console.log(chatIds);
    return chatIds;
}

const onlineUsers = (socketId,user) => {
    //console.log(socketId,user);
    
    const newuser = {
        socketId: socketId,
        Id:user._id,
        username:user.username
    }
    users.push(newuser);
    //console.log(users)
   return users;

}

const removeUser = (socketId) =>{
    users = _.reject(users,function(el){return el.socketId === socketId;});
}
// const removeActiveChat = (userId) => {
//     activatedChat = _.reject(activatedChat, function(el) { return el.userId === userId; });
    
//   }
  
module.exports = {createChatId,onlineUsers,removeUser}