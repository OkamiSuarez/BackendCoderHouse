// primero importar mongoose
import mongoose from "mongoose";

// dejar una constante con el nombre de la coleccion
const clientesCollection = "Clientes";

// Definir el schema
// es un objeto que define la forma de los documentos
// Se configura el nombre de los campos y los tipos de datos que almacenan

const clienteSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    edad: Number
})

// Definimos el modelo 
const ClientesModel = mongoose.model(clientesCollection, clienteSchema)

export default ClientesModel;