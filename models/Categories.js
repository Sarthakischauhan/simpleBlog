
import mongoose, { mongo } from "mongoose";

const CategoriesSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
},{timestamps:true});

const categories  = mongoose.model("Category",CategoriesSchema);

export default categories;