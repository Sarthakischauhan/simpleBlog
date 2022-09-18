import express from "express";
import Category from "../models/Categories.js"

const router = express.Router()


router.post("/", async (req,res) => {
    const cat = await Category(req.body);

    try{
        const newCat = await cat.save();
        res.status(200).json(newCat);
    }
    catch (err) {
        res.status(500).json(err);
    }
})


router.get("/", async (req, res) => {
    try {
      const cats = await Category.find();
      res.status(200).json(cats);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  export default router;