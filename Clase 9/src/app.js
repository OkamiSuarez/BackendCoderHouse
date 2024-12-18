/* Clase 9 Motores de plantillas */

import express from "express"
const app = express()
const PUERTO =  8080

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/",(req,res)=>{
    res.send('Hola mundo')
})

// rutas
app.listen(PUERTO, ()=> console.log('escuchando el puerto 8080'))