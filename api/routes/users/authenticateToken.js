const User = require('../../models/user');

module.exports = async (req,res,next)=>{
    try{
        if(req.auth){
            const user = await User.findOne({_id: req.auth.id}).exec();
            if(!user){
                res.json({
                    error: {
                        status: true,
                        message: 'Invalid Credentials'
                    }
                });
            }
            else{
                const userInfo = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    emailId: user.emailId,
                    bio: user.bio,
                    id: user.id
                }
                res.json({
                    error: {
                        status: false,
                        message: 'Success'
                    },
                    userInfo
                });
            }
        }
        else{
            res.json({
                error: {
                    status: true,
                    message: 'Invalid Credentials'
                }
        });
        }
    }
    catch(error){
        //console.log('error:',error);
        res.json({
            error: {
                status: true,
                message: 'Error',
                error_object: error
            }
    });
    }
}