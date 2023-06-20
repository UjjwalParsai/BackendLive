import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";

const app=express();

import ProductRouter from "./routes/product.route.js";
import CategoryRouter from "./routes/category.route.js";
import CartRouter from "./routes/cart.route.js"

mongoose.connect("mongodb+srv://Dream:dreamepic@cluster0.ea17dov.mongodb.net/apperals?retryWrites=true&w=majority")
.then(result=>{
    console.log("Database connected");

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}));

    app.use("/product",ProductRouter);
    app.use("/category",CategoryRouter);
    app.use("/CartRouter",CartRouter);

    app.listen("6061",()=>{
        console.log("apparels server started");
    })
})