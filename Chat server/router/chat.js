const express = require('express');
const router = express.Router();
const auth = require('../middleware/verifytoken');
//const PrivetChat = require('../models/PrivetChat');
const Chat = require('../models/Chat');
const User = require('../models/User');
const GroupChat = require('../models/GroupChat');

// router.post('/',auth,async(req,res) => {
    // try {
    //     console.log("haii");
    //     const senderchat = new PrivetChat({
    //         userId: req.user.id,
    //         chatId:"1233655",
            
    //     });

    //     await senderchat.save()
        // const alreadychat =await Chat.findOne({userId:req.body.friendId,chatId:req.body.chatId});

        // const msg = {
        //     message: req.body.message,
        //     sender: req.user.id
        // }
    
        // const senderchat = new Chat({
        //     userId: req.user.id,
        //     chatId:req.body.chatId,
        //     friendId:req.body.friendId,
        //     messages: msg
        // });
        // const reciverchat = new Chat({
        //     userId: req.body.friendId,
        //     chatId:req.body.chatId,
        //     friendId:req.user.id,
        //     messages: msg
        // });
        // if(alreadychat){
        //     alreadychat.messages.push(msg);
        //     senderchat.save();
        //     alreadychat.save();
        // }else{
        //     await senderchat.save();
        //     await reciverchat.save();
        // }
       
//     } catch (error) {
//         console.log(error.message);
//     }
    
// });

// router.put('/message/:chatId',auth,async(req,res) =>{
//     try {
//         const senderchat = await Chat.findOne({userId:req.user.id,chatId:req.params.chatId});
//         const reciverchat = await Chat.findOne({userId:req.body.friendId,chatId:req.params.chatId});
//         const msg = {
//             message:req.body.message,
//             sender:req.user.id
//         }

//         const newreciverchat = new Chat({
//             userId: req.body.friendId,
//             chatId:req.body.chatId,
//             friendId:req.user.id,
//             messages: msg
//         });

//         if(!reciverchat){
//             senderchat.messages.push(msg);
//             await newreciverchat.save()
//             await senderchat.save();
//         }else{
//             senderchat.messages.push(msg);
//             reciverchat.messages.push(msg);
//             await senderchat.save();
//             await reciverchat.save();
//         }
//     } catch (err) {
//         console.log(err);
//     }
    
// });

router.get('/chatlist',auth,async(req,res) =>{
    //console.log(req.user._id);
    try {
        const user = await User.findById(req.user._id);
        //console.log(user);
        const privetlist = await Chat.find({userId:req.user._id});
        // console.log(req.user._id);
        const grouplist = await GroupChat.find({userId:req.user._id});
        // console.log('gru',grouplist);
        const chatlist = [...privetlist,...grouplist];
        // console.log(chatlist);
        
        //if(!chatlist) return res.status(400).json({msg:'You have a not chat'});

        res.status(200).json({chatlist,user});

    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
})

router.get('/message/:chatId',auth,async(req,res) =>{
    const chat = await Chat.findOne({userId:req.user._id,chatId:req.params.chatId});
    // chat.unread = false;
    //chat.save()
    
    res.status(200).json(chat);
});

router.get('/message/group/:chatId',auth,async(req,res) =>{
    const chat = await GroupChat.findOne({userId:req.user._id,chatId:req.params.chatId});
    chat.unread = false;
    chat.save()
    //console.log(chat);
    res.status(200).json(chat);
});

router.get('/friend',auth,async(req,res)=>{
    const friend = await User.find().select(['-password','-email','-_v']);
    // console.log(friend);
    // const user = await User.findById(req.user.id).select(['-password']);
    res.status(200).json(friend);
});

router.put('/:chatId',auth,async(req,res) =>{
    console.log('hooo');
    try {
        const chat = await Chat.findOne({userId:req.user.id,chatId:req.params.chatId});
        chat.unread = false;
        chat.save();
        res.json(chat.unread);
    } catch (err) {
        console.log(err.message);
    }
})

module.exports = router;