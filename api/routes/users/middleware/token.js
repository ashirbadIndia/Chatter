const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    const token = req.headers.authorization?req.headers.authorization.split(' ')[1]:null;
    const auth = token? jwt.verify(token,'privacy_is_a_myth'): null;
    if(!auth){
        res.json({
            error: {
                status: true,
                message: 'Invalid credentials',
            }
        });
    }
    else{
        req.auth = auth;
        next()
    }
}