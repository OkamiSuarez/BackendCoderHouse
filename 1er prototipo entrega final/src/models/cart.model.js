import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    // id: {
    //     type: Number,
    //     required: true,
    //     unique: true
    // },
    title: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true,
        min: 0
    }
})

const cartModel = mongoose.model("carts", cartSchema)

export default cartModel