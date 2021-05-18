const express= require('express');
const connectDB=require('./config/db');
const app=express();

//connect database
connectDB();

//Init middleware(body parser)
//It is called as a middle ware because it recognizes imcoming data from POST or PUT as JSON data
app.use(express.json({extended:false}));

//SIngle EndPoint
app.get('/',(req,res)=> res.send('API RUnning'));

//Define ROutes for api
app.use('/api/users', require('./config/api/users'));
app.use('/api/auth', require('./config/api/auth'));
app.use('/api/profile', require('./config/api/profile'));
app.use('/api/posts', require('./config/api/posts'));

//Search for env variable in heroku or use default local 5000 port
const PORT=process.env.PORT || 5000;

//listen to port
app.listen(PORT, ()=> console.log('Server Started on port ${PORT} '));