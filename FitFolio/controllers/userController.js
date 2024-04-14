const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
//@desc Register the user
//@route POST /api/users/register
//@access private

const registerUser = asyncHandler(async(req,res) => {
    console.log("The body is : ",req.body);
    const {username,email,password} = req.body;
    if(!username||!email||!password){
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("Email already registered !");
    }
    //Hash pasword
    const hashedPassword = await bcrypt.hash(password, 10);
   const user = await User.create({
    username,
    email,
    password:hashedPassword
    });
    console.log(`user created ${user}`)
    if(user){
        res.status(201).json({_id:user.id,email:user.email})
    }else{
        res.status(400);
        throw new Error("User data not valid");
    }
});

//@desc login the user
//@route POST /api/users/login"
//@access private

const loginUser = asyncHandler(async(req,res) => {
    const {email,password} = req.body;
    if(!email||!password){
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const user = await User.findOne({email});
    //compare password
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            },

        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"1m"}
    );
        
        res.status(200).json({accessToken});

    }else{
        res.status(401).json({accessToken});
        throw new Error("Email or Password not valid!");
    }
});

//@desc Current user info
//@route GET /api/users/curren
//@access private

const currenttUser = asyncHandler(async(req,res) => {
    const client = await Client.find();
    res.status(200).json(client);
});

module.exports = { registerUser,loginUser,currenttUser};
