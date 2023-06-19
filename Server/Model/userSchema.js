const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    messages:[
        {
            name:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true
            },
            message:{
                type:String,
                required:true
            },
        }
    ],
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
});

//Hashing password ....
userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
        this.cpassword = await bcrypt.hash(this.cpassword,12);
    }
    next();
});

//Generate Token ...

userSchema.methods.generateAuthToken = async function(){
    try {     
        let generatedToken = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:generatedToken});
        await this.save();
        return generatedToken;
    } catch (error) {
        console.log(error);
    }
}

//Add message 
userSchema.methods.saveMessage = async function(name,email,message){
    try {
        this.messages = this.messages.concat({name,email,message});
        await this.save();
        return this.messages;
    } catch (error) {
        console.log('Error while saving '+error)
    }
}

const User = mongoose.model('USER',userSchema);

module.exports=User;