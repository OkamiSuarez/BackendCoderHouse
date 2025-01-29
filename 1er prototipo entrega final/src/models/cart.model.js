import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true,
        min: 0
    }
});

const cartSchema = new mongoose.Schema({
    products: [cartItemSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const cartModel = mongoose.model("carts", cartSchema)

export default cartModel