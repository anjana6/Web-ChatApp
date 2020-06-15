const User = require('../models/User');

const createChatId = async (userId) => {
    const chatIds = [];
    console.log(userId);
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

module.exports = {createChatId}