const Chat = require('../models/Chat');

const senderchat = (userId,chatId,friendId,message) => {
    const userchat = {
        userId,
        chatId,
        friendId,
        messages:message
    }

    return userchat;
}

const reciverchat = (userId,chatId,friendId,message) => {
    const friendchat = {
        userId : friendId,
        chatId,
        friendId : userId,
        messages:message
    }

    return friendchat;
}

module.exports = {senderchat,reciverchat}