import { Router } from "express";
const router = Router()

import ProductManager from "../managers/product-manager.js";
const manager = new ProductManager("./src/data/productos.json");

// primer punto de entrega
router.get("/products", async(req,res)=>{
    // se puede meter trycatch y tirar un 500 cuando  no  se  accede al manager y a  los datos
    const productos = await manager.getProducts()
    res.render("home",{productos})
})

// segundo punto de  la pre entrega
router.get("/realtimeproducts",(req,res)=>{
    res.render("realtimeproducts")
})

// falta aqui  exportarlo
export default router