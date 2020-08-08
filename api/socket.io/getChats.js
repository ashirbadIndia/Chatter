const conv = require('../models/conversation');

module.exports = async (socket)=>{
    if(socket.auth.stat){
        populateQuery = [{path:'userOne', select:'id firstName lastName'}, {path:'userTwo', select:'id firstName lastName'}];
        const chatroom = await conv.findOne({chatId: socket.chatRoomId}).populate(populateQuery).exec();
        const response = {
            error:{
                status: false,
            },
            messages: chatroom.messages,
            myDetail: (socket.auth.userId === chatroom.userOne.id)?chatroom.userOne:chatroom.userTwo,
            userDetail: (socket.auth.userId === chatroom.userOne.id)?chatroom.userTwo:chatroom.userOne
        }
        //console.log(response);
        socket.emit('receive_chats',response);
    }
    
}