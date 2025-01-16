/* Mongoose
    1.- Diferentes clientes para DBS
    2.-MongoDB Atlas
    3.-DBaas (Database as a service)
    4.-Configuracion e instalacion de mongoose
    5.-CRUD en nuestra aplicacion

*/

import express from "express";
import clientesRouter from "./routes/clientes.router.js";
// import mongoose from "mongoose";
import "./database.js"
const app = express()
const PUERTO = 8080;

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// rutas
app.use("/clientes", clientesRouter)

app.listen(PUERTO, ()=> console.log(`Escuchando atentamente en ${PUERTO}`))

