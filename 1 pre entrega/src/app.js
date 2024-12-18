// const express  = require('express')
import express from  "express"
const app = express();
const PUERTO = 8080;
import productRouter from "./routes/product.router.js"
import cartRouter from "./routes/cart.router.js"
import router from "./routes/product.router.js";

// middleware
app.use(express.json())
// se declara al server que se va a trabajar con JSON
app.use(express.urlencoded({extended: true}))

// ruta base
app.get('/',(req,res)=>{
    res.send("Primer pre entrega coderhouse Okami Suarez")
})

// RUTAS
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)

//  Listen
app.listen(PUERTO,()=>{
    console.log("escuchando el puerto 8080")
})