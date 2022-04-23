const User = require('../../models/user');

module.exports = async (req,res,next)=>{
    try{
        const terms = req.query.term.split(" ").filter((ele)=>ele);
        
        let query = [ {
            firstName: {$regex: terms[0] , $options:'i'}
        }, {
            lastName: {$regex: terms[0] , $options:'i'}
        },{
            emailId: {$regex: terms[0] , $options:'i'}
        } ];

        if(terms.length == 2){
            query = [{
                firstName: {$regex: terms[0] , $options:'i'},
                lastName: {$regex: terms[1] , $options:'i'}
            },...query]
            console.log(query);
        }

        const users = await User.find({ $or:  query}).exec();
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