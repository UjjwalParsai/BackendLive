import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    customerId:{
        type: String,
       required:true
    },
    date: {
        type:String,
        required:true
    },
    deliveryAddress: {
        type:String,
        required:true
    },
    contactPerson: {
        type:String,
        required:true
    },
    contactNumber:{
        type:Number,
        required:true
    },
    billAmount:{
        type:Number,
        required:true
    },
    status: {
        type: String,
        default: "pending"
    },
    paymentMode:{
        type:String,
        required:true
    },
    orderItem:[{
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        },
        qty: Number
    }]
});
export const Order = mongoose.model("order",orderSchema);