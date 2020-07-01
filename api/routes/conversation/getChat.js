const Conversation = require('../../models/conversation');

const getChat = async (req,res,next)=>
{
    try{
        console.log(req.params._id);
        const ChatCollection = Conversation(req.params._id);
        const chats = await ChatCollection.find();
        res.json(chats);
    }
    catch(error){
        console.log(error);
        res.json(error);
    }
}

module.exports = getChat;