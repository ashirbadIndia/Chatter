const User = require('../../models/user');
const bcrypt = require('bcryptjs');

module.exports = async (req,res,next)=>{
    try{
        const userInfo= req.body.userInfo;
        const enc_pass = await bcrypt.hash(userInfo.password,14);
        const user= new User({
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            emailId: userInfo.emailId,
            password: enc_pass,
            bio: userInfo.bio
        });
        const result = await user.save();
        //console.log(result);
        res.json({
            error: {
                status: false
            },
            result:{
                success: true,
                message: "Account successfully created!"
            }
        });
    }
    catch(error){
        console.log('error:',error);
        res.json({
            error: {
                status: true,
                message: (error.keyPattern.emailId)? "email-Id already registered" : "unknown error",
                error_object: error
            }
        })
    }
}