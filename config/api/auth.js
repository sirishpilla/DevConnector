const express=require('express');

const router=express.Router();
const auth= require('../../middleware/auth');
const User=require('../../models/User')
//@route    GET api/auth
//@desc     Test route 
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

module.exports = router;