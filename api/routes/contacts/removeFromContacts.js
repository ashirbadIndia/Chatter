const User = require('../../models/user');
const Chat = require('../../models/conversation');

module.exports = async (req,res,next)=>{
    try{
        //const user = await User.findById(req.auth.id).exec();
        //console.log(req.body);
        //if(user){
            //console.log(req.body.contactInfo);
            const result = await User.updateOne(
                {_id: req.auth.id},
                { $pull: { contacts: {id: req.body.contactInfo.id } } }
            )
            /*resp = user.contacts.pull({_id: req.body.contactInfo.id});
            const result = await user.save();*/
            //console.log(result);
            res.json({
                error:{
                    status: false
                }
            });
        /*}
        else{
            res.json({
                error:{
                    status: true,
                    message: 'Invalid Credentials'
                }
            });
        }*/
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