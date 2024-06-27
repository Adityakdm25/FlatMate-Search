import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import userRouter from "./routes/user.routes.js";
import authRouter from './routes/auth.routes.js'
import cookieParser from "cookie-parser";
import postRouter from "./routes/post.route.js";
import path from "path";
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to MongoDb");
}).catch((err)=>{
    console.log("Error:"+err);
});
const __dirname = path.resolve();
const app=express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.listen(3000,()=>{
    console.log("Server is running on port 3000!");
});

app.use('/api/user',userRouter);

app.use('/api/auth',authRouter);
app.use("/api/post",postRouter);
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
  


app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message =err.message||"Interval server error";
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});

