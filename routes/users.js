import express from "express";
import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import Post from "../models/Posts.js";

const router = express.Router();

router.put("/:id",async (req,res) => {
    if ( req.body.UserId === req.params.id)
    {
        if ( req.body.password ){
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password,salt);

            req.body.password = hashedPass;
        }
        try {
            const updateUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set : req.body
                },
                { new : true }
            );
            res.status(200).json(updateUser);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(401).json("No such user exists");
    }
});

router.delete("/:id", async (req,res) => {
    if ( req.body.UserId == req.params.id )
    {
        try { 
            const user = await User.findById(req.params.id);
            try { 
                await Post.deleteMany({username : user.username});
                await User.findByIdAndDelete(req.parans.id);
                res.status(200).json("User deleted successfully");
            }
            catch (err) {
                res.status(500).json(err);
            }
        }
        catch (err) {
            res.status(401).json("User not found");
        }
    }
    else {
        res.status(403).json("You can only delete your account");
    }
})


router.get("/:id", async (req,res) => { 
    try { 
        const user = await User.findById(req.params.id);
        const {password,...others} = user._doc;
        res.status(200).json(others);
    }
    catch (err) {
        res.status(500).json(err);
    }
})


export default router;