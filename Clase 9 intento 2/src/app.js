/* Motores de plantillas */

import express from "express";
import viewsRouter from "./routes/views.router.js"
const app = express();
const PUERTO = 8080;

// 1 importar metodo de motor de plantillas
import{engine} from "express-handlebars"

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static("./src/public"))

// Configurando el motor de plantillas
app.engine("handlebars", engine())
// se registra express handlebars como motor de plantilla para express, el primero es la extension del archivo y el segundo el metodo del motor
app.set("view engine", "handlebars")
// se establece handlebars como motor predeterminado 
app.set("views", "./src/views")

//Ruta
app.use("/", viewsRouter)

// Multer
// SIRVE PARA HACER UPLOAD DE DATA
// Instalacion
//  nmp i multer
// se importa el multer
import multer from 'multer'

// si queremos que se guarde en la carpeta correcta se tiene que configurar un storage
const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, "./src/public/img")
    },
    filename: (req,file,cb)=>{
        cb(null,file.originalname)
    }
})

// se crea objeto upload
// const upload = multer({dest:"./src/public/img"})
const upload = multer({storage})


// Se crea una ruta para subir una imagen desde postman 
app.post('/upload', upload.single("imagen"), (req,res) =>{
    res.send('imagen cargada')
})

// Listener
app.listen(PUERTO, ()=> console.log('escuchando puerto 8080'))