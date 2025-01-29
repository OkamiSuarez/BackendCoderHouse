import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const productSchema = new mongoose.Schema({
    // id: {
    //     type: Number,
    //     required: true,
    //     unique: true,
    // },
    title: {
        type: String,
        required: [true, 'El título es obligatorio']
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    code: {
        type: String,
        required: [true, 'El código es obligatorio'],
        unique: true
    },
    price: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: [true, 'El stock es obligatorio'],
        min: [0, 'El stock no puede ser negativo']
    },
    category: {
        type: String,
        required: [true, 'La categoría es obligatoria']
    },
    thumbnails: {
        type: [String],
        default: []
    }
});

// usando el metodo plugin
productSchema.plugin(mongoosePaginate)

const productModel = mongoose.model("products", productSchema)

export default productModel