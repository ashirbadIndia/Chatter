const User = require('../../models/user');
const bcrypt = require('bcryptjs');

module.exports = async (req,res,next)=>{
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
                const updateValues=req.body.updateValues;
                if(updateValues.password){
                    updateValues.password = await bcrypt.hash(updateValues.password,14);
                }
                const response = await user.update({...updateValues}).exec();
                if(!response.nModified){
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
                        message: 'Successfully Updated',
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
        console.log('error:',error);
        res.json({
            error: {
                status: true,
                message: error.code===11000 && error.keyPattern.emailId?'Email-Id already exist':'Error occured',
                error_object: error
            }
        });
    }
}