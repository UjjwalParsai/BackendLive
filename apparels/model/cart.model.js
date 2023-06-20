import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
    customerId:{
        type: String,
        required:true  
    },
    cartItems:[{
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        }
    }]
});

export const Cart = mongoose.model("cart",cartSchema);