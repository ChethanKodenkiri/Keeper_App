const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const cookieParser = require("cookie-parser");

router.use(cookieParser())

require('../DB/Connection');
const User = require('../Model/userSchema');

router.get("/", (req, res) => {
    res.send("Hello from router");
});

router.post("/register", async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(401).json({ err: 'Please fill all the field ...' });
    }
    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            console.log("User Already exist !...");
            return res.status(422).json({ message: 'User Already exist !...' });

        } else if (password != cpassword) {
            console.log("Password is not matching !...");
            return res.status(421).json({ message: 'Password is not matching !...' });
        } else if (phone.length !== 10) {
            return res.status(403).json({ message: 'Invalid Phone number' });
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });

            //hash the passowrd...(there in userSchema)
            await user.save();
            res.status(201).json({ message: 'User registered succesfully ....' });
        }
    } catch (error) {
        console.log(error);
    }
});


router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all the filed' });
        }

        const userExist = await User.findOne({ email: email });
        if (userExist) {
            const isMatch = await bcrypt.compare(password, userExist.password);
            const token = await userExist.generateAuthToken();
            //Cookies ...

            res.cookie('jwt', token.toString(), {
                //1 year in millisecond
                // expires: new Date(Date.now() + 25892000000),
                //1 hr in millisecond
                expires: new Date(Date.now() + 3600000),
                httpOnly: true
            });

            if (isMatch) {
                 res.status(201).json({ message: 'Login successfull ....' });
            
            } else {
               
                res.status(400).json({ message: 'Invalid Credential ....' });
            }
        } else {
            res.status(400).json({ message: 'Invalid Credential ....' });
        }

    } catch (error) {
        console.log(error);

    }
});



//About Page 
router.get('/about',authenticate,(req,res)=>{
    res.send(req.rootUser);
});

//Get Data
router.get('/getData',authenticate,(req,res)=>{
    res.send(req.rootUser);
});

//Logout Page 
router.get('/logout',authenticate,(req,res)=>{
    try {
        res.clearCookie('jwt');
        res.status(201).send('cookis deleted successfully...');
    } catch (error) {
        res.status(401).send('Unable to delete cookis...');
    }
  
   
});

router.post('/contact',authenticate,async (req,res)=>{
    const{name,email,message} = req.body;
    if(!name || !email || !message){
        res.status(401).json({ message: 'Please fill the field...' });
    }

    const userExist =await User.findOne({_id:req.userID});
    if(userExist){
       const userMessage = userExist.saveMessage(name,email,message);
        res.status(201).json({ message: 'User registered succesfully ....' });
    }
});

router.get('/home',authenticate,async(req,res)=>{
        res.status(201).send(req.rootUser);
})

module.exports = router;