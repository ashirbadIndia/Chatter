const User = require('../../models/user');
const mongoose = require('mongoose');

module.exports = async (req,res,next)=>{
    try{
        if(req.body.action === 'FAVOURITE'){
            const userId = req.body.contactInfo.userId;
            const result = await User.updateOne(
                {"_id": req.auth.id, "contacts.userId": mongoose.Types.ObjectId(userId)},
                { $set: { "contacts.$.favourite" : req.body.contactInfo.favStat }}
            );
            console.log(result);
            if(result.nModified){
                res.json({
                    error:{
                        status: false
                    },
                    response: {
                        status: 'ok'
                    }
                });
            }
            else{
                res.json({
                    error:{
                        status: true
                    }
                });
            }
        }
        else{
            res.json({
                error:{
                    status: true
                }
            });
        }
    }
    catch(error){
        console.log('error:',error);
        res.json({
            error:{
                status: true,
                errorObj: error
            }
        });
    }
    
    
}