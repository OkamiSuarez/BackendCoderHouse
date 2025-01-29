import { Router } from "express";
const router = Router()
// import mongoosePaginate from "mongoose-paginate-v2"

import ProductManager from "../managers/product-manager.js";
import productModel from "../models/products.model.js";
const manager = new ProductManager("./src/data/productos.json");

// primer punto de entrega
router.get("/products", async(req,res)=>{
    const page = req.query.page || 1;
    const limit = 3
    // se puede meter trycatch y tirar un 500 cuando  no  se  accede al manager y a  los datos
    // const productos = await manager.getProducts()
    // res.render("home",{productos})
    const productos = await productModel.paginate({},{limit,page})
    // console.log(productos)
    const productosRender = productos.docs.map(
        producto=>{
            const {_id,...rest} = producto.toObject()
            return rest
        }
    )
    res.render("home",{
        productos: productosRender,
        hasPrevPage: productos.hasPrevPage,
        hasNextPage: productos.hasNextPage,
        prevPage: productos.prevPage,
        nextPage: productos.nextPage,
        currentPage: productos.page,
        totalPages: productos.totalPages
    })
    // console.log(productosRender)
})

// segundo punto de  la pre entrega
router.get("/realtimeproducts",(req,res)=>{
    res.render("realtimeproducts")
})

// falta aqui  exportarlo
export default router