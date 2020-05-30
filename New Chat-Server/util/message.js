const Chat = require('../models/Chat');

const createMessage = (text,sender) => {
    const msg = {
        message: text,
        sender:sender
    }
    return msg
}

module.exports = {createMessage};