const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');

module.exports = async (req,res,next)=>{
    try{
            console.log(req.body);
            const validation= req.body.validation;
            const user = await User.findOne({emailId: validation.emailId}).exec();
            if(!user){
                res.json({
                    error: {
                        status: true,
                        message: `Wrong Email-Id or password`
                    }
                });
            }
            else{
                const pass_match = await bcrypt.compare(validation.password,user.password);
                    if(user && pass_match){
                        const token = jwt.sign({emailId:user.emailId, id: user.id},'privacy_is_a_myth',{expiresIn: '1h'});
                        if(!token){
                            throw new Error('Token generation failed');
                        }
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
                            userInfo,
                            token: token
                        });
                    }
                    else {
                        res.json({
                            error: {
                                status: true,
                                message: `Wrong Email-Id or password`
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
                message: 'Error',
                error_object: error
            }
    });
    }
}