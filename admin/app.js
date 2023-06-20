import express from 'express';
import bodyParser from "body-parser";
import AdminRouter from './routes/admin.route.js';
// import session from 'express-session';
import mongoose from 'mongoose';
const app = express();

// app.set("view-engine","ejs");

mongoose.connect("mongodb://127.0.0.1/vivaah")
.then(result=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    // app.use(session({secret:"stststststststst"}));
    app.use("/admin",AdminRouter);
    app.listen(3000,()=>{
        console.log("Server Started ");
    });
})
.catch(err=>{
    console.log("Database is not connected");
        console.log(err);
})