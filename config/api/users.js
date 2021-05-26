const express=require('express');
const gravatar=require('gravatar');
const bcrypt=require('bcryptjs');
const router=express.Router();
const jwt=require('jsonwebtoken');
const config=require('config')
const { check, validationResult}=require('express-validator');

//Get the user model data
const User=require('../../models/User');

//@route    GET api/users
//@desc     Register User
//@access   Public ---- If we need a token to access a route it is called Private
router.post('/',[ 
    check('name','Name is required').not().isEmpty(),
    check('email','Include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more char').isLength({min:6})
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
    if(user){
        return res.status(400).json({errors:[{msg: 'User Already Exists'}]});
    }
    //Get user Gravatar
    const avatar = gravatar.url(email,{
        s: '200',
        r: 'pg',
        d: 'mm'
    })
    user= new User({
        name,
        email,
        avatar,
        password
    });
    //Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    

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
