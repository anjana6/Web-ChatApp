const express = require('express');
const router = express.Router();
const auth = require('../middleware/verifytoken');
const Chat = require('../models/Chat');
const User = require('../models/User');

router.post('/',auth,async(req,res) => {
    const friend = "5ecb1d249fc0bc39b896512c"
    
    if( req.userId > friend ){
        console.log('hee');
        console.log(friend.concat(req.user.id));
        
    }
    else{
        console.log('hoo')
        console.log(req.user.id.concat(friend))
    }
    try {
        const reciver =await User.findById(req.body.reciverId);
        //console.log(reciver);
        const newmsg = {
            message: req.body.msg,
            reciver: req.body.reciverId,
            sender: req.user.id
        }
        // console.log(newmsg);
        const chat = new Chat({
            chatId:req.body.chatId,
            users:[{userId:req.user.id,username:req.user.name},{userId:req.body.reciverId,username:reciver.username}],
            messages: newmsg
    
        });
        await chat.save();
    } catch (error) {
        console.log(error.message);
    }
    
});

router.put('/message',auth,async(req,res) =>{
    try {
        const chat = await Chat.findOne({chatId:req.body.chatId});
        const msg = {
            message:req.body.msg,
            reciver:req.body.reciverId,
            sender:req.user.id
        }
        // console.log(msg);
        chat.messages.push(msg);

        await chat.save();
    // console.log(chat);
    } catch (err) {
        console.log(err);
    }
    
});

router.get('/chatlist',auth,async(req,res) =>{
    
    try {
        const chatlist =await Chat.find({"users.userId":req.user.id});
        const user = await User.findById(req.user.id);
        // console.log(chatlist);
       
        if(!chatlist) return res.status(400).json({msg:'You have a not chat'});

        res.status(200).json({chatlist,user});

    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
})

router.get('/message/:chatId',auth,async(req,res) =>{
    const messages =await Chat.findOne({chatId:req.params.chatId});
    
    res.status(200).json(messages);
})

module.exports = router;