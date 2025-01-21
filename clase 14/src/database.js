import mongoose, { mongo } from "mongoose";

mongoose.connect("mongodb+srv://okami97backdev:coderhouse@cluster0.tfr60.mongodb.net/Coderest?retryWrites=true&w=majority&appName=Cluster0")
.then(()=> console.log('conectado con exito'))
.catch((error)=> console .log(error))