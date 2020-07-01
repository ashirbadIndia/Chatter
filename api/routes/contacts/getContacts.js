const User = require('../../models/user');

module.exports = async (req,res,next)=>{
    try{
        console.log(req.params);
        const result = await User.findOne({_id: req.params.id});
        const contacts = await Promise.all(
            result.contacts.map(async (item)=>{
                const userInfo= await User.findOne({_id: item.userId});
                if(userInfo){
                    return {
                        ...item,
                        firstName: userInfo.firstName,
                        lastName: userInfo.lastName,
                        bio: userInfo.bio
                    } 
                }
                return {
                    ...item,
                    removed: true
                }
            })
        );
        console.log(contacts);
        res.json(contacts);
    }
    catch(error){
        console.log('error:',error);
        res.json(error);
    }
    
    
}