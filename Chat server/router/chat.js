const express = require('express');
const router = express.Router();
const auth = require('../middleware/verifytoken');
const Chat = require('../models/Chat');

router.post('/',auth,async(req,res) => {
    const friend = "5ecbceb871d7883e40b91973"
    // // console.log('hee')
    if( req.userId > friend ){
        console.log('hee');
        console.log(friend.concat(req.userId));
        // console.log(req.userId - "5ecb1d249fc0bc39b896512c")
    }
    else{
        console.log('hoo')
        console.log(req.userId.concat(friend))
    //     console.log(req.userId.concat(friend));
    //     '5ecb1c3271ad3a1a20de8f405ecb1d249fc0bc39b896512c'
    //     // console.log("5ecb1d249fc0bc39b896512c"- req.userId);
    }
    try {
        const newmsg = {
            message: req.body.msg,
            reciver: req.body.reciverId,
            sender: req.userId
        }
        // console.log(newmsg);
        const chat = new Chat({
            chatId:req.body.chatId,
            users:[req.userId,req.body.reciverId],
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
            sender:req.userId
        }
        // console.log(msg);
        chat.messages.unshift(msg);

        await chat.save();
    console.log(chat);
    } catch (err) {
        console.log(err);
    }
    
});

router.get('/chatlist',auth,async(req,res) =>{

})

module.exports = router;