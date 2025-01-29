import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: {
            type: Number,
            required: true,
            min: 0
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

cartSchema.pre('findOne', function(next){
    this.populate("products")
    next()
})

const cartModel = mongoose.model("carts", cartSchema)

export default cartModel