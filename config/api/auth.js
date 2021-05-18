const express=require('express');

const router=express.Router();

//@route    GET api/auth
//@desc     Test route 
//@access   Public ---- If we need a token to access a route it is called Private
router.get('/',(req,res)=> res.send('Auth ROute'));

module.exports = router;