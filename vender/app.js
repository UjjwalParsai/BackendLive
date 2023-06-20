import bodyParser from "body-parser";
import express from "express"
import mongoose from "mongoose"
import vendorCrouter from "./routes/category.route.js";
import venderRouter from "./routes/vendor.route.js"
import cors from "cors"

const app = express()

mongoose.connect("mongodb+srv://Dream:dreamepic@cluster0.ea17dov.mongodb.net/vender?retryWrites=true&w=majority")
    .then(result => {
        console.log("vender Database connected");
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use("/category", vendorCrouter);
        app.use("/", venderRouter);
        app.listen("8082", () => {
            console.log("vender server started")
        })
    })
    .catch(err => {
        console.log(err);
    })
