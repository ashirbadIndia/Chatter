const User = require('../../models/user');

module.exports = async (req,res,next)=>{
    try{
        const myId= req.auth.id;
        const user = await User.findById(myId).populate('recents.userId');
        if(user){
            const recents = user.recents.map((item)=>{
                if(!item.userId){
                    const response = {
                        not_exist: true,
                        chatId: item.chatId,
                        id: item.id
                    }
                    item.remove();
                    return response;
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
            console.log('___recents___',user.recents);
            await user.save();
            res.json({
                error:{
                    status: false,
                },
                recents: recents.filter((item)=>!item.not_exist)
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