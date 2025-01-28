import mongoose from "mongoose";

const cursoSchema = new mongoose.Schema({
    dias: [],
    nombre: String,
    horario: Number,
    numeroComision: Number,
    
})



const CursoModel = mongoose.model("cursos", cursoSchema)


export default CursoModel