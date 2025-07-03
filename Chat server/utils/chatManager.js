const _ = require('lodash');
const GroupChat = require('../models/GroupChat');
const Chat = require('../models/Chat');

const {createMessage,checkActivatedChat} = require('./messageManager');


const checkChat = async (chatId) => {
    const chat = await Chat.find({chatId})
    if(chat.length == 2){
        return "2";
    }
    if(chat.length == 1){
        return "1";
    }
    if(chat.length == 0){
        return "0";
    }
}



const haveReciverChat = async (chatId,reciverId) => {
    try {
        const chat = await Chat.findOne({chatId,userId:reciverId});
        if(chat) return true;

        return false;
    } catch (err) {
        console.log(err);
    }
    
}

const createSenderChat = async(sender,msg) => {
    try {
        const newChat = new Chat({
            userId: sender._id,
            chatId: msg.chatId,
            frdId:msg.frdId,
            name:msg.name,
            messages:createMessage(sender._id,msg.msg),
            unread:false,
            status:"p"
        })
        await newChat.save();
        return newChat;
    } catch (err) {
        console.log(err)
    }
    
}

const createReciverChat = async(sender,msg) => {
    try {
        const newChat = new Chat({
            userId: msg.frdId,
            chatId: msg.chatId,
            frdId:sender._id,
            name:sender.username,
            messages:createMessage(sender._id,msg.msg),
            unread:checkActivatedChat(msg.frdId,msg.chatId),
            status:"p"
        })
        await newChat.save();
        return newChat;
    } catch (err) {
        console.log(err)
    }
    
}

const createGroupChat = async (members,name,chatId,sender) => {
    try {
        if (!sender || !sender._id || !sender.username) {
            console.log('Invalid sender data:', sender);
            throw new Error('Invalid sender data');
        }

        if (!members || !Array.isArray(members)) {
            console.log('Invalid members data:', members);
            throw new Error('Invalid members data');
        }

        for (const member of members) {
            if (!member || !member.userId || !member.name) {
                console.log('Invalid member data:', member);
                throw new Error('Invalid member data');
            }
        }

        const allmembers = [...members,{name:sender.username,userId:sender._id}]
        const message =  createMessage(sender._id, "You are add to group");
        
        await Promise.all(allmembers.map(async (mem) => {
            const newchat = new GroupChat({
                userId: mem.userId,
                name: name,
                chatId: chatId,
                users: allmembers,
                messages: message,
                unread: true,
                status: "g"
            });
            await newchat.save()
        }));
        
        const chat = await GroupChat.findOne({chatId:chatId,userId:sender._id}).select(['-users','-userId']);
        return chat;
    } catch (err) {
        console.log('Error in createGroupChat:', err)
        throw err;
    }
    
   }

module.exports = {
    checkChat,
    haveReciverChat,
    createGroupChat,
    createSenderChat,
    createReciverChat,
};