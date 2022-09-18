import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";
import userRoute from "./routes/users.js";
import catRoute from "./routes/category.js";
const app = express();
dotenv.config();

app.use(express.json());


mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(console.log("Successful connection to mongodb")).catch((err) => console.log(err))

app.use("/api/auth",authRoute);
app.use("/api/post",postRoute);

app.use("/api/users",userRoute);
app.use("/api/category",catRoute);


app.listen(5000,() => {
    console.log("This is a test line");
});


