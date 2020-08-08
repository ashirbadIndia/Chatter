const User = require('../../models/user');
const bcrypt = require('bcryptjs');

module.exports = async (req,res,next)=>
{
    try{
        const user = await User.findOne({_id: req.auth.id}).exec();
        if(!user){
            res.json({
                error: {
                    status: true,
                    message: 'Invalid credentials',
                }
            });
        }
        else{
            const pass_match = await bcrypt.compare(req.body.validation.password, user.password);
            if(pass_match){
                const response = await User.deleteOne({_id: req.auth.id}).exec();
                if(response.deletedCount<1){
                    res.json({
                        error: {
                            status: true,
                            message: 'Unknown Error',
                        }
                    });
                }
                else
                res.json({
                    error: {
                        status: false,
                    },
                    result:{
                        success: true,
                        message: "Account removed successfully!"
                    }
                });
            }
            else{
                res.json({
                    error: {
                        status: true,
                        message: 'Wrong Password',
                    }
                });
            }
        }
    }
    catch(error){
        console.log('error',error);
        res.json({
            error: true,
            message: "Some errors occured",
            error_object: error
        });
    }
}