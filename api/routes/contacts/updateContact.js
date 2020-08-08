const User = require('../../models/user');

module.exports = async (req,res,next)=>{
    try{
        let result;
        if(req.body.action === 'BLOCK/UNBLOCK'){
            result = await User.updateOne(
                {_id: req.body.currentUser._id, "contacts.userId": req.body.contact.userId},
                { $set: { "contacts.$.blocked" : req.body.blocked }}
            );
        }
        else if(req.body.action === 'CHANGE_COLOR'){
            result = await User.updateOne(
                {_id: req.body.currentUser._id, "contacts.userId": req.body.contact.userId},
                { $set: { "contacts.$.chatColor" : req.body.color }}
            );
        }
        console.log(result);
        res.json(result);
    }
    catch(error){
        console.log('error:',error);
        res.json(error);
    }
    
    
}