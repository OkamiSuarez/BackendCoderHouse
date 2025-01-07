import { Router } from "express";
const viewsRouter = Router()

viewsRouter.get("/",(req,res)=>{
    // res.send('hola mundo, bienvenido 2025')
    res.render("index")
})

export default viewsRouter