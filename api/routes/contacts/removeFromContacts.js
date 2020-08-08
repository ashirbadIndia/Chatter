const User = require('../../models/user');
const Chat = require('../../models/conversation');

module.exports = async (req,res,next)=>{
    try{
        const user = await User.findById(req.auth.id).exec();
        console.log(req.body);
        if(user){
            resp = user.contacts.pull({_id: req.body.contactInfo.id});
            const result = await user.save();
            await Chat.deleteOne({chatId: req.body.contactInfo.chatId});
            //console.log(result);
            res.json({
                error:{
                    status: false
                }
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
        /*const result = await User.updateOne(
                            {_id: req.body.myId},
                            { $pull: { contacts: {userId: req.body.userId } } }
                        );
        res.json({
            success: result.ok? true: false
        });*/
    }
    catch(error){
        console.log('error:',error);
        res.json({
                error:{
                    status: true,
                    message: 'Error',
                    error_object: error
                }
            });
    }
    
    
}