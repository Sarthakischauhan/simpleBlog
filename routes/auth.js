import express from "express";
import User from "../models/Users.js";
import bcrypt from "bcryptjs";

const authRouter = express.Router();

authRouter.post("/register",async (req,res) => {
    try{
        const {username,email,password} = req.body;
        if ( !email || !username || !password)
        {
            res.status(200).json({error:"Add all data"});
        }
        
        if ( await User.findOne({email:email})){
            res.status(422).json({error:"User already exists"})
        }
        else{
            const salt = await bcrypt.genSalt(10)
            const hashedPass = await bcrypt.hash(password,salt);
            const newUser = new User({
                username:username,
                email:email,
                password:hashedPass
            })
            const user = await newUser.save();
            const {password, ...others} = user._doc;
            res.status(200).json(others);
        }
    }
    catch (err){
        res.status(500).json(err);
    }
})
authRouter.post("/login", async (req,res) => {
    try{
        const user = await User.findOne({username:req.body.username});
        if ( user )
        {
            const validate = await bcrypt.compare(req.body.username,user.password)
            !!validate && res.status(400).json("Wrong Credentials")
            
            const {password, ...others} = user._doc;
            res.status(200).json(others);
        }
        else{
            res.status(400).json("Wrong Credentials");
        }
    }
    catch (err){
        res.status(500).json(err);
    }
})

export default authRouter;