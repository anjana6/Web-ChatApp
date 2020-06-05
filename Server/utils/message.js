const Chat = require('../models/Chat');

const getMessage = async (userId,chatId) => {
    // console.log(chatId);
    const messages = await Chat.findOne({userId,chatId});
    return messages;
}

module.exports = {getMessage};