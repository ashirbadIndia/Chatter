const Conversation = require('../../models/conversation');

const addChat = async (req,res,next)=>
{
    try{
        const ChatCollection = Conversation(req.params._id);
        const chat = new ChatCollection(req.body.chat);
        const result = await chat.save();
        res.json(result);
    }
    catch(error){
        console.log(error);
        res.json(error);
    }
}

module.exports = addChat;