import mongoose from "mongoose";

// nos conectamos con mongoDB Atlas
mongoose.connect("mongodb+srv://okami97backdev:coderhouse@cluster0.tfr60.mongodb.net/Tienda?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('Conectado con exito a la DB'))
    .catch((error)=> console.log("error terrible " + error))