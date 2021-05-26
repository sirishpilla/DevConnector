const express=require('express');
const jwt=require('jsonwebtoken');
const config=require('config');
const bcrypt=require('bcryptjs');
const gravatar=require('gravatar');
const { check, validationResult}=require('express-validator');
const router=express.Router();
const auth= require('../../middleware/auth');
const User=require('../../models/User')
//@route    GET api/auth
//@desc     Authenticater USer and get token
//@access   Public ---- If we need a token to access a route it is called Private
// We passed auth to the function to use the middleware to decode the user
router.get('/',auth,async (req,res)=> {
    try{
        const user= await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }



});
router.post('/',[ 
    check('email','Include a valid email').isEmail(),
    check('password','Password is required').exists()
],async (req,res)=> {
    const errors=validationResult(req);
    //To display our error messages
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    //Storing req.body parameters in name email and password
    const{name,email,password}=req.body;

    try{
    //See if user exists
    let user = await User.findOne({email})
    if(!user){
        return res.status(400).json({errors:[{msg: 'Invalid Credentials'}]});
    }
    //Get user Gravatar
    const avatar = gravatar.url(email,{
        s: '200',
        r: 'pg',
        d: 'mm'
    })
   
    const isMatch= await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.status(400).json({errors:[{msg: 'Invalid Credentials'}]});
    }
    //return jsonwebtoken--when user registers they can login right away using jsonwebtoken
    const payload = {
        user: {
            id:user.id
        }
    }

    jwt.sign(payload,
         config.get('jwtToken'),
         {expiresIn: 360000},
         (err,token)=>{
             if(err) throw err;
             res.json({token});
         });


    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
   






    //(req.body)Used to install body pareser but now it is included in express
    //console.log(req.body);
    
});


module.exports = router;