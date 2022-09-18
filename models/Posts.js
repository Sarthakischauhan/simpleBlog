import mongoose, { mongo } from "mongoose";

const PostSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },

    desc : {
        type : String,
        required : true,
    },

    photo : {
        type : String,
        default : ""
    },

    username : {
        type : String,
        required : true,        
    },

    categories : {
        type : Array,
        required : false
    }
},{timestamps:true});

const posts  = mongoose.model("Post",PostSchema);

export default posts;