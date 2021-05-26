//Middleware which gets the token, decodes it and req.user contains decoded user which can be used in all the routes to pull information

const jwt=require('jsonwebtoken');
const config=require('config');

module.exports= function(req,res,next){
    //Get token from header
    const token=req.header('x-auth-token');

    //Check if no token
    if(!token){
        return res.status(401).json({msg:'No token, authorization denied'});

    }
    //verify token
    try{
        const decoded= jwt.verify(token, config.get('jwtToken'));
        req.user= decoded.user;
        next();
    }catch(err){
        res.status(401).json({msg:'token not valid'});
    }
}