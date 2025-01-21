/* 
CODEREST
Instalar npm i express express-handlebars mongoose multer
*/

import express from "express";
import { engine } from "express-handlebars";
import multer from "multer";
import routerImagenes from "./routes/imagen.router.js";
const app = express()
const PUERTO = 8080;
import "./database.js"

// midlewares 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("./src/public"))
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./src/public/img")
    },
    filename:(req,file,cb)=>{
        cb(null, file.originalname)
    }
})
app.use(multer({storage}).single("image"))

// handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

// rutas

app.use("/",routerImagenes)
// app.get("/", (req,res)=>{
//     res.send("Hola mundo, en la root")
// })

app.listen(PUERTO, ()=> console.log('escuchando el puerto 8080'))