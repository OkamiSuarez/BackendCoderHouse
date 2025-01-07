import { Router } from "express";
const router = Router()

router.get("/", (req,res)=>{
    // res.send('funcionaaa')
    res.render("index")
})

// ejemplo de ejercicio pre entrega 2
// se importa el product manager
// se crea la instancia
// se usa el metodo get products

router.get("/", async (req,res)=>{
    // res.render("home")
    try {
        const productos = await LockManager.getProducts()
        res.render("home", {productos})
    } catch (error) {
        res.status(500).send("Error fatal, se suspende la navidad")
    }
})

export default router