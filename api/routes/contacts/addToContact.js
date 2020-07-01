const User = require('../../models/user');

module.exports = async (req,res,next)=>{
    try{
        const chatId = (req.body.myId >= req.body.userId)?
                            `${req.body.userId}-${req.body.myId}`:
                            `${req.body.myId}-${req.body.userId}`;
        const contact= {
            userId: req.body.userId,
            chatId: chatId,
            chatColor: 'default',
            blocked: false,
            favourite: false
        } 
        const result = await User.updateOne({_id: req.body.myId},{ $addToSet: {contacts: contact}});
        var response;
        if(result.ok){
            const userInfo = await User.findOne({_id: req.body.userId});
            response= {
                contact: {...contact, firstName: userInfo.firstName, 
                    lastName: userInfo.lastName,
                    bio: userInfo.bio
                },
                result: result
            }
        }
        console.log(response);
        res.json(response);
    }
    catch(error){
        console.log('error:',error);
        res.json(error);
    }
    
    
}