const User = require('../../models/user');

module.exports = async (req,res,next)=>{
    try{
        const users = await User.find(req.query).exec();
        const response = users.map((user)=>{
            return {
                firstName: user.firstName,
                lastName: user.lastName,
                id: user.id,
                bio: user.bio
            }
        })
        res.json(response);
    }
    catch(error){
        console.log('error:',error);
        res.json(error);
    }
}