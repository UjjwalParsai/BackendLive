import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";


 import cors from "cors";
import CustomerRouter from "./routes/customer.route.js"

const app = express();

mongoose.connect("mongodb+srv://Dream:dreamepic@cluster0.ea17dov.mongodb.net/customer?retryWrites=true&w=majority")
    .then(result => {
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        app.use("/", CustomerRouter);
        app.listen(8083, () => {
            console.log("customer database connected");
            console.log("server started....");
        });
    })
    .catch(err => {
        console.log("Database is not connected");
        console.log(err);
    })


    