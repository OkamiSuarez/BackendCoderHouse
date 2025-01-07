import { Router } from "express";
const router = Router()

// Creando un array de productos para iterar
const arrayProductos = [
    {nombre:"Fideos", descripcion:"Mas ricos", precio:100},
    {nombre:"Arroz", descripcion:"Nunca se pasa", precio:200},
    {nombre:"Helado", descripcion:"Mas frio que nada", precio:150}
]

router.get("/", (req,res)=>{
    // res.send('Bienvenido a la clase 9')

    const usuario = {
        nombre:"Tinki",
        apellido:"Winki",
        mayorEdad: true
    }
    const titulo = 'Clase 9'
    res.render("index",{usuario,titulo,arrayProductos})
})

router.get("/contact",(req,res)=>{
    res.render("contacto")
})

router.get("/preguntas",(req,res)=>{
    res.render("preguntas")
})

export default router