import mongoose from "mongoose";

const alumnoSchema = new mongoose.Schema({
    nombre:{
        type:String,
        index:true
    },
    apellido: String,
    email: {
        type:String,
        unique: true,
        required: true
    },
    edad: Number,
    // cursos: []
    cursos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "cursos"
    }]
})

//     // middleware Pre de Mongoose
// alumnoSchema.pre("findOne", funcion(next){
//     // this.populate("cursos")
// })
// falta completar esto 

const AlumnoModel = mongoose.model("alumnos", alumnoSchema)

export default AlumnoModel 