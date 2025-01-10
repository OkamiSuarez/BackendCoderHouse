// const express  = require('express')
import express from  "express"
const app = express();
const PUERTO = 8080;
import productRouter from "./routes/product.router.js"
import cartRouter from "./routes/cart.router.js"
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import viewsRouter from "./routes/views.router.js"
import router from "./routes/product.router.js";

// middleware
app.use(express.json())
// se declara al server que se va a trabajar con JSON
app.use(express.urlencoded({extended: true}))
app.use(express.static("./src/public"))

// ruta base
app.get('/',(req,res)=>{
    res.send("Primer pre entrega coderhouse Okami Suarez")
})

// Express handlebars
app.engine("handlebars", engine())
app.set("view engine","handlebars")
app.set("views","./src/views")

// RUTAS
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
app.use("/",viewsRouter)

//  Listen
const httpServer = app.listen(PUERTO,()=>{
    console.log("escuchando el puerto 8080")
})

// websockets

import ProductManager from "./managers/product-manager.js";
const manager = new ProductManager("./src/data/productos.json")


const io =  new Server(httpServer)
io.on("connection",async(socket)=>{
    console.log("cliente conectado")

    // se envia  el array de productos
    socket.emit("productos", await manager.getProducts())

    // agregando productos
    socket.on("agregarProducto", async(producto)=>{
        await manager.addProduct(producto)
        io.sockets.emit("productos", await manager.getProducts())
    })

    // eliminando producto 
    socket.on("eliminarProducto", async (id)=>{
        console.log(id)
        // se  llama al  manager y se usa el metodo de eliminar "deleteProduct"
        // Despues de eliminar se tienen que actualizar los productos

        // POSIBLE SOLUCION  AQUI 
                    // router.delete("/:pid", async(req,res)=>{
                    //     const productos = await manager.getProducts();
                    //     let id = req.params.pid
                    //     let productIndex = productos.findIndex(producto => producto.id == id)
                    
                    //     if(productIndex !== -1){
                    //         productos.splice(productIndex,1);
                    //         res.status(202).send({status:'Success',mensaje:'Producto eliminado'})
                    //         manager.guardarArchivo(productos)
                    //     }else{
                    //         res.status(404).send({status:'Failure',mensaje:'Producto no encontrado'})
                    //     }
                    // })

    })
})