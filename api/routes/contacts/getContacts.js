const User = require('../../models/user');

module.exports = async (req,res,next)=>{
    try{

        const myId= req.auth.id;
        const user = await User.findById(myId).populate('contacts.userId');
        if(user){
            const contacts = user.contacts.map((item)=>{
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
                    bio: item.userId.bio,
                    chatId: item.chatId,
                    userId: item.userId.id,
                    id: item.id,
                    favourite: item.favourite
                }
            })
            console.log(contacts);
            res.json({
                error:{
                    status: false,
                },
                contacts: contacts
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
        
        /*const contacts = await Promise.all(
            result.contacts.map(async (item)=>{
                const userInfo= await User.findOne({_id: item.userId});
                if(userInfo){
                    return {
                        ...item,
                        firstName: userInfo.firstName,
                        lastName: userInfo.lastName,
                        bio: userInfo.bio
                    } 
                }
                return {
                    ...item,
                    removed: true
                }
            })
        );
        console.log(contacts);
        res.json(contacts);*/
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