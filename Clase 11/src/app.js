// Chat comunitario
// npm i express express-handlebars socket.io

import express from 'express';
import { engine } from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';
const app = express();
const PUERTO = 8080;

// middlewares
app.use(express.json())
app.use(express.static("./src/public"))

// configurando express handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views","./src/views");

// rutas
app.use("/", viewsRouter)

// listener
// referencia del server para pasarlo al socket 
const httpServer = app.listen(PUERTO,()=> console.log('Escuchando el puerto 8080'))
// generar instancia del cosket 
const io = new Server(httpServer)

// se coloca un array con la conversacion  que se envia en el chat 
let messages = []

io.on("connection", (socket) =>{
    // console.log("cliente conectado")
    socket.on("message",data=>{
        // se recibe la data del cliente y se pushea en el array
        messages.push(data)
        // Enviamos el historial de mensajes al cliente o al front
        io.emit("messagesLogs",messages)

    })
})