const mongoose = require('mongoose');

const DB=process.env.DATABASE;
mongoose.connect(DB).then(()=>{
    console.log('Connected succefully ....')}).catch((err)=>{
        console.log('connection unsuccesfull... Reason for that :  '+ err)
    });