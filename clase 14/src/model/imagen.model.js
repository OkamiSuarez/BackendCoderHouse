import mongoose from "mongoose";

const imagenSchema = new mongoose.Schema({
    title: String,
    description: String,
    filename: String,
    path: String
})

const imagenModel = mongoose.model("imagenes", imagenSchema)

export default imagenModel