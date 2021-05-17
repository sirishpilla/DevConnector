const express= require('express');

const app=express();

//SIngle EndPoint
app.get('/',(req,res)=> res.send('API RUnning'));
//Search for env variable in heroku or use default local 5000 port
const PORT=process.env.PORT || 5000;

//listen to port
app.listen(PORT, ()=> console.log('Server Started on port ${PORT} '));