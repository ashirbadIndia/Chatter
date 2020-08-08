const mongoose = require('mongoose');
const conv = require('../models/conversation');
const users = require('../models/user');

module.exports = async (socket,io,message)=>{
    if(socket.auth.stat){

        const sess = await mongoose.startSession();
        sess.startTransaction();

        const chatroom = await conv.findOne({chatId: socket.chatRoomId}).exec();
        chatroom.messages.push({author:socket.auth.userId,message: message});
        const response = await chatroom.save({session: sess});
        //console.log(response);

        const userId = (chatroom.userOne.toString() === socket.auth.userId)?
                                chatroom.userTwo: chatroom.userOne;
        const myId = (chatroom.userOne.toString() === socket.auth.userId)?
                            chatroom.userOne: chatroom.userTwo;
        const user = await users.findOne({_id: userId}).exec();

        let obj = user.recents.find( i => i.userId.toString() === myId.toString() );
        //console.log(obj);
        if(obj){
            res = user.recents.pull({_id: obj._id});
            //console.log(user);
        }

        while(user.recents.length>=10){
            user.recents.shift()
        }
        user.recents.push({
            chatId:socket.chatRoomId,
            userId: myId,
            lastMessage: message
        })
        await user.save({session: sess});
        //console.log(res);

        const resp = await sess.commitTransaction();
        if(resp.result.ok){
            //console.log(response.messages[response.messages.length-1]);
            io.in(socket.chatRoomId).emit('chat_added',response.messages[response.messages.length-1]);
        }
    }
    
}