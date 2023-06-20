import mongoose from "mongoose";
import { setUncaughtExceptionCaptureCallback } from "process";

const productSchema = mongoose.Schema({
   title: {
      type: String,
      required: true
   },
   stock: {
      type: Number,
      required: true
   },
   price: {
      type: Number,
      required: true
   },
   discount: {
      type: Number,
      required: true
   },
   rating: {
      type: Number,
      required: true
   },
   description: {
      type: String,
      required: true
   },
   stock: {
      type: String,
      required: true
   },
   category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category"
   }
})

export const Product = mongoose.model("product", productSchema);