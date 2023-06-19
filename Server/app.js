const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const app= express();
app.use(cookieParser());
//const User =require('./Model/userSchema');


dotenv.config({path:'./config.env'});
const PORT = process.env.PORT;
require('../Server/DB/Connection');
app.use(express.json());
app.use(require('../Server/router/auth'));

// const middleware = (req,res,next)=>{
//     console.log("I am middleware");
//     next();
// }

app.get("/",(req,res)=>{
    res.send("Hello Server");
});

// app.get("/about",middleware,(req,res)=>{
//     res.send("Hello About");
// });
app.listen(PORT,()=>{
    console.log('Server Started '+PORT+ '...')
})