import { Router } from "express";
const clientesRouter = Router()

// Importar el ClientesModel
import ClientesModel from '../models/clientes.model.js';

// GET
clientesRouter.get("/", async (req,res)=>{
try {
    const clientes = await ClientesModel.find()
    console.log(clientes)
    res.send(clientes)
} catch (error) {
    res.status(500).json({mensaje:"Error en el server, moriremos"})
}

    // const clientes = await ClientesModel.find()
    // res.send(clientes)
})
// POST
clientesRouter.post("/", async(req,res)=>{
    try {
        const cliente = new ClientesModel(req.body)
        await cliente.save()
        res.send({mensaje: 'Cliente generado exitosamente ',cliente})
    } catch (error) {
        res.status(500).json({mensaje:"error fatal",error})
    }
})

// PUT

clientesRouter.put("/:id", async (req,res) =>{
    try {
        const cliente = await ClientesModel.findByIdAndUpdate(req.params.id, req.body)
        // evaluar si se encuentra el usuario
        res.send("todo bien, actualizado")
    } catch (error) {
        res.status(500).send("error fatalisimo")
    }
})

// DELETE
clientesRouter.delete("/:id", async (req,res)=>{

    try {
        const cliente = await ClientesModel.findByIdAndDelete(req.params.id)
        // validar si existe el user
        res.send("cliente eliminado")
    } catch (error) {
        res.status(500).send("error fatalisimo en la eliminacion")
        
    }

})


export default clientesRouter