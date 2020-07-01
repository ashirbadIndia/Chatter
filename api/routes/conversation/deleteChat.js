const Conversation = require('../../models/conversation');

const addChat = async (req,res,next)=>
{
    try{
        const ChatCollection = Conversation(req.params._id);
        const result= await ChatCollection.deleteOne({_id: req.body.messageId});
        res.json(result);
    }
    catch(error){
        console.log(error);
        res.json(error);
    }
}

module.exports = addChat;