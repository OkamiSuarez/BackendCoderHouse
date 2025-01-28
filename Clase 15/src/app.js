// Clase 16 mongoose

import mongoose from "mongoose";
import UsuarioModel from "./models/usuario.model.js";

// mongodb+srv://okami97backdev:coderhouse@cluster0.tfr60.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// const main = async () =>{
//     await mongoose.connect("mongodb+srv://okami97backdev:coderhouse@cluster0.tfr60.mongodb.net/MongoAvanzado?retryWrites=true&w=majority&appName=Cluster0")

//     // se verifica si se pueden ver a los users
//     // const respuesta = await UsuarioModel.find()
//     // const respuesta = await UsuarioModel.find().explain("executionStats")
//     // const respuesta = await UsuarioModel.find({"nombre":"Carlos"}).explain("executionStats")
//     const respuesta = await UsuarioModel.find({"edad":{$lt:19}}).explain("executionStats")
//     console.log(respuesta)
// }

// main()

// metodo explain()
// permite ver las stats de la consulta
// el parametro que se le pasa es "executionStats"
// Ese param permite obtener el detalles de los tiempos de consulta

// se busca por nombre

// POPULATIONS
/* 
Es una funcion de mongoose que permite relacionar documentos de diferentes colecciones

*/

import AlumnoModel from "./models/alumno.model.js";
import CursoModel from "./models/curso.model.js";

const main = async() =>{
    await mongoose.connect("mongodb+srv://okami97backdev:coderhouse@cluster0.tfr60.mongodb.net/MongoAvanzado?retryWrites=true&w=majority&appName=Cluster0")

    // const respuesta = await CursoModel.find()
    // console.log(respuesta)


        // // buscando un alumno
        //     const juanPerez = await AlumnoModel.findById("679191b0b529fdb1c7e30925")
        //     // console.log(juanPerez)

        // // buscando un curso 
        //     const cursoBackend = await CursoModel.findById("679191bab529fdb1c7e3092c")
        //     // console.log(cursoBackend)

        //     // ahora se ingresa el curso al alumno 
        //     juanPerez.cursos.push(cursoBackend)

        //     // actualizar el documento de MongoDB
        //     // await AlumnoModel.findByIdAndUpdate(juanPerez._id, juanPerez)
        //             await AlumnoModel.findByIdAndUpdate("679191b0b529fdb1c7e30925")

        //     // si quiero ver al alumno con sus cursos, se puede hacer lo siguiente 
        //     // const alumnoConCursos = await AlumnoModel.findById("679191b0b529fdb1c7e30925")
        //     const alumnoConCursos = await AlumnoModel.findById("679191b0b529fdb1c7e30925").populate("cursos")
        //     console.log(alumnoConCursos)


}
main()