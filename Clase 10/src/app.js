// websockets
/* modelo nuevo del cliente servidor
    websockets, basado en TCP, la COMUNICACION ES BIDIRECCIONAL
    eso es lo importante, determinar que con websockets podemos conseguir informacion de vuelta 
    Se levanta el server  
*/

import express from "express"
import {engine} from "express-handlebars"
import viewsRouter from "./routes/views.router.js"
const app = express()
const PUERTO = 8080

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("./src/public"))

// se configura el motor 
app.engine("handlebars", engine())
app.set("view engine","handlebars")
app.set("views", "./src/views")

// rutas
app.use("/", viewsRouter)

// IMPORTANDO SOCKET.IO
    // primero el metodo server
import { Server } from "socket.io"

// guardar referencia del server de express
    // listen
const httpServer = app.listen(PUERTO, ()=> console.log('Escuchando puerto 8080'))

// se genera la instancia de socket DEL LADO DEL BACKEND
const io = new Server(httpServer)

// creando array de usuarios
const usuarios = [
    {id:1,nombre:"Tinki",apellido:"Teletubi"},
    {id:2,nombre:"Dipsi",apellido:"Teletubi"},
    {id:3,nombre:"Lala",apellido:"Teletubi"},
    {id:4,nombre:"Po",apellido:"Teletubi"}
]

io.on("connection",(socket)=>{
    console.log('un cliente se conecto')

    // se interpreta el mensaje del front 
    socket.on("mensaje",(data)=>{
        console.log(data)
    })

    // ahora el servidor le envia un mensaje al cliente
    socket.emit("saludito","Hola Front! como tas?")

    // enviamos un array de usuarios al front
    socket.emit("usuarios",usuarios)
})

