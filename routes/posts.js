import express from "express";
import User from "../models/Users.js";
import Post from "../models/Posts.js";

const router = express.Router();

router.post("/", async (req,res) => {
    const post = new Post(req.body);
    try { 
        const newPost = await post.save();
        res.status(200).json(newPost);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

router.put("/:id", async (req,res) => {
    const post = await Post.findById(req.params.id);
    if ( post.username === req.body.username )
    {
        try {
            const updatedPost = await Post.findByIdAndUpdate(
                req.params.id,
                {
                    $set : req.body
                },
                {new : true}
            );
            res.status(200).json(updatedPost);
        }
        catch (err) 
        {
            res.status(500).json(err);
        }
    }
    else{
        res.status(403).json("You can only update your post");
    }
})

router.delete("/:id",async (req,res) => {
    const post = await Post.findById(req.params.id);
    if ( post.username === req.body.username )
    {
        try{ 
            await post.delete();
            res.status(200).json("Post deleted successfuly..");
        }
        catch (err){
            res.status(500).json(err);
        }
    }
    else {
        res.status(500).json("Post not found");
    }
})

router.get("/:id",async ( req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }
    catch(err) {
        res.status(500).json(err);
    }
})


router.get("/",async (req,res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
      let posts;
      if (username) {
        posts = await Post.find({ username });
      } else if (catName) {
        posts = await Post.find({
          categories: {
            $in: [catName],
          },
        });
      } else {
        posts = await Post.find();
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
})


export default router;