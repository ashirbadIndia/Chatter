const User = require('../../models/user');

module.exports = async (req,res,next)=>{
    try{
        console.log(req.body);
        const result = await User.updateOne(
                            {_id: req.body.myId},
                            { $pull: { contacts: {userId: req.body.userId } } }
                        );
        res.json({
            success: result.ok? true: false
        });
    }
    catch(error){
        console.log('error:',error);
        res.json(error);
    }
    
    
}