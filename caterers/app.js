import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";



import catererRouter from "./routes/caterers.route.js";
import feedbackRouter from "./routes/feedback.route.js"
import favouriteRouter from "./routes/favourite.router.js"
import requestRouter from "./routes/request.router.js"


import cors from "cors"
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://Dream:dreamepic@cluster0.ea17dov.mongodb.net/caterer?retryWrites=true&w=majority")
    .then(result => {
        console.log("Database Connected....");


        app.use("/", catererRouter);
        app.use("/feedback", feedbackRouter);
        app.use("/favourite", favouriteRouter);
        app.use("/request", requestRouter);

        app.listen(6066, () => {
            console.log("Server Started for caterer");
        })
    })
    .catch(err => {
        console.log(err);
    });



