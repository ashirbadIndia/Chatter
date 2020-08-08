const User = require('../../models/user');

module.exports = async (req,res,next)=>{
    try{
        const myId= req.auth.id;
        const user = await User.findById(myId).populate('recents.userId');
        if(user){
            const recents = user.recents.map((item)=>{
                if(!item.userId){
                    return {
                        not_exist: true,
                        chatId: item.chatId,
                        id: item.id
                    }
                }
                return {
                    firstName: item.userId.firstName,
                    lastName: item.userId.lastName,
                    lastMessage: item.lastMessage,
                    lastMessageTime: item.lastMessageTime,
                    chatId: item.chatId,
                    userId: item.userId.id,
                    id: item.id
                }
            })
            res.json({
                error:{
                    status: false,
                },
                recents: recents
            });
        }
        else{
            res.json({
                error:{
                    status: true,
                    message: 'Invalid Credentials'
                }
            });
        }
        
    }
    catch(error){
        console.log('error:',error);
        res.json({
            error:{
                status: true,
                message: 'Invalid Credentials'
            }
        });
    }
    
    
}