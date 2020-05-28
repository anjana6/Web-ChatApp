const express = require('express');
const router = express.Router();
const auth = require('../middleware/verifytoken');
const Chat = require('../models/Chat');
const User = require('../models/User');

router.post('/',auth,async(req,res) => {
    try {
        const alreadychat =await Chat.findOne({userId:req.body.friendId,chatId:req.body.chatId});

        const msg = {
            message: req.body.message,
            sender: req.user.id
        }
    
        const senderchat = new Chat({
            userId: req.user.id,
            chatId:req.body.chatId,
            friendId:req.body.friendId,
            messages: msg
        });
        const reciverchat = new Chat({
            userId: req.body.friendId,
            chatId:req.body.chatId,
            friendId:req.user.id,
            messages: msg
        });
        if(alreadychat){
            alreadychat.messages.push(msg);
            senderchat.save();
            alreadychat.save();
        }else{
            await senderchat.save();
            await reciverchat.save();
        }
       
    } catch (error) {
        console.log(error.message);
    }
    
});

router.put('/message/:chatId',auth,async(req,res) =>{
    try {
        const senderchat = await Chat.findOne({userId:req.user.id,chatId:req.params.chatId});
        const reciverchat = await Chat.findOne({userId:req.body.friendId,chatId:req.params.chatId});
        const msg = {
            message:req.body.message,
            sender:req.user.id
        }

        const newreciverchat = new Chat({
            userId: req.body.friendId,
            chatId:req.body.chatId,
            friendId:req.user.id,
            messages: msg
        });

        if(!reciverchat){
            senderchat.messages.push(msg);
            await newreciverchat.save()
            await senderchat.save();
        }else{
            senderchat.messages.push(msg);
            reciverchat.messages.push(msg);
            await senderchat.save();
            await reciverchat.save();
        }
    } catch (err) {
        console.log(err);
    }
    
});

router.get('/chatlist',auth,async(req,res) =>{
    
    try {
        const chatlist =await Chat.find({userId:req.user.id}).populate('friendId',['username']).populate('userId',['username']);
        
        if(!chatlist) return res.status(400).json({msg:'You have a not chat'});

        res.status(200).json(chatlist);

    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
})

router.get('/message/:userId/:chatId',auth,async(req,res) =>{
    const chatmessages =await Chat.findOne({userId:req.params.userId,chatId:req.params.chatId});
    
    res.status(200).json(chatmessages);
})

module.exports = router;