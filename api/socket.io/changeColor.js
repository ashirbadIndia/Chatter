const conv = require('../models/conversation');

module.exports = async (socket,color)=>{
    if(socket.auth.stat){
        const chatRoom = await conv.findOne({chatId:socket.chatRoomId}).exec();
        const updateValues = (chatRoom.userOne.toString()===socket.auth.userId)?
                                    {colorOne: color} : {colorTwo: color};
                                    
        const res = await chatRoom.updateOne(updateValues).exec();
        /*if(result.nModified){
            //console.log(response.messages[response.messages.length-1]);
            io.in(socket.chatRoomId).emit('chat_cleared');
        }*/
    }
    
}