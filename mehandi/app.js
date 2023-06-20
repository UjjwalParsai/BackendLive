import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";


import mehandiRouter from "./routes/mehandi.route.js"
import feedbackRouter from "./routes/feedback.route.js";
import favouriteRouter from "./routes/favourite.router.js";
import requestRouter from "./routes/request.router.js";





mongoose.connect("mongodb+srv://Dream:dreamepic@cluster0.ea17dov.mongodb.net/mehandi?retryWrites=true&w=majority")
    .then(result => {
        console.log("Database Connected....");

        const app = express();
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));


        app.use("/", mehandiRouter);
        app.use("/feedback", feedbackRouter);
        app.use("/favourite", favouriteRouter);
        app.use("/request", requestRouter);

        app.listen(6063, () => {
            console.log("Server Started for mehandi");
        })

    })
    .catch(err => {
        console.log(err);
    });


