const express=require('express');

const router=express.Router();
const { check, validationResult}=require('express-validator/check');

//@route    GET api/users
//@desc     Register User
//@access   Public ---- If we need a token to access a route it is called Private
router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email','Include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more char').isLength({min:6})
],(req,res)=> {
    const errors=validationResult(req);
    //To display our error messages
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    //Used to install body pareser but now it is included in express
    //console.log(req.body);
    res.send('User ROute')
});

module.exports = router;
