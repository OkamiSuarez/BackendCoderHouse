import { Router } from "express";
const routerImagenes = Router();

// importando el imagen model
import imagenModel from "../model/imagen.model.js";

// se usa FS para eliminar las imagenes 
import {promises as fs} from "fs"

// root que muestra el muro con las imagenes

routerImagenes.get("/", async (req,res)=>{
    const imagenes = await imagenModel.find().lean()
    // lean transforma los documentos en mongodb a js
    res.render("index", {imagenes})
})

// ruta upload para acceder al formulario de carga
routerImagenes.get("/upload", async(req,res)=>{
    res.render("upload")
})

// ruta upload
routerImagenes.post("/upload", async(req,res)=>{
    try {
        const imagen = new imagenModel();
        imagen.title = req.body.title;
        imagen.description = req.body.description;
        imagen.filename = req.file.filename;
        imagen.path = "/img/" + req.file.filename
        // Guardando la imagen
        await imagen.save()

        res.redirect("/")
    } catch (error) {
        res.status(500).send({mensaje:'Error terrible predecido'})
    }
})

// ruta para eliminar imagen
routerImagenes.get("/image/:id/delete", async (req,res)=>{
    let {id} = req.params
    const imagen = await imagenModel.findByIdAndDelete(id)
    await fs.unlink("./src/public" + imagen.path)
    res.redirect("/")
})

export default routerImagenes;