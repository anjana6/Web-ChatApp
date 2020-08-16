const express = require('express');
const router = express.Router();
const auth = require('../middleware/verifytoken');
const Chat = require('../models/Chat');
const User = require('../models/User');
const GroupChat = require('../models/GroupChat');

const { activeChat } = require('../utils/messageManager');


router.get('/chatlist',auth,async(req,res) =>{
    
    try {
        const user = await User.findById(req.user._id).select(['-password','-email','-_v']);
        const privetlist = await Chat.find({userId:req.user._id});
        const grouplist = await GroupChat.find({userId:req.user._id});
        const chatlist = [...privetlist,...grouplist];
        res.status(200).json({chatlist,user});

    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
})

router.get('/message/:chatId',auth,async(req,res) =>{
    try {
        const chat = await Chat.findOne({userId:req.user._id,chatId:req.params.chatId});
        activeChat(req.user._id,req.params.chatId)
        if(chat){
            chat.unread =false;
            chat.save();
            res.status(200).json(chat.messages);
            return null
        } 
        res.status(200).json(null)

       
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
    
});

router.get('/message/group/:chatId',auth,async(req,res) =>{
    try {
        const chat = await GroupChat.findOne({userId:req.user._id,chatId:req.params.chatId});
        activeChat(req.user._id,req.params.chatId)
        if(chat){
            chat.unread = false;
            chat.save();
        }
        res.status(200).json(chat.messages);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
   
    
});

router.get('/friend',auth,async(req,res)=>{
    try {
        const friend = await User.find().select(['-password','-email','-_v']);
        if(!friend){
            res.status(400).json({msg:'YOu have no friend'})
        }
        res.status(200).json(friend);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
    
});

module.exports = router;