const conv = require('../models/conversation');

module.exports = async (socket,io)=>{
    if(socket.auth.stat){
        const result = await conv.updateOne(
            {chatId: socket.chatRoomId},
            { $pull: { messages: {} } }
        );
        //console.log(result);
        if(result.nModified){
            //console.log(response.messages[response.messages.length-1]);
            io.in(socket.chatRoomId).emit('chat_cleared');
        }
    }
    
}