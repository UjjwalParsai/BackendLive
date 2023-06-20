

import express, { Router } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
const app = express();
import VanueRouter from "./routes/venueDetails.route.js"
import CategoryRouter from "./routes/category.route.js"
import RequestRouter from "./routes/request.route.js"
import BookingRouter from "./routes/booking.route.js"
import FeedbackRouter from "./routes/feedback.route.js"
import FavouriteRouter from "./routes/favourite.route.js"

mongoose.connect("mongodb+srv://Dream:dreamepic@cluster0.ea17dov.mongodb.net/venue?retryWrites=true&w=majority")
    .then(result => {
        console.log("Database connect");
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cors())
        app.use("/", VanueRouter)
        app.use("/category", CategoryRouter)
        app.use("/request", RequestRouter)
        app.use("/booking", BookingRouter)
        app.use("/favourite", FavouriteRouter)
        app.use("/feedback", FeedbackRouter)
        app.listen("6060", () => {
            console.log("server started");
        })
    })
    .catch(err => {
        console.log(err);
    }) 