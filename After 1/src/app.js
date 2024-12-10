const express  = require('express')
// si no se autocompleta es por que no se ha instalado
const app = express();
const PUERTO = 8080;

// importando el productManager
const ProductManager = require("./managers/product-manager.js");
const manager = new ProductManager("./src/data/productos.json")

// rutas
app.get('/',(req,res)=>{
    res.send("Hola mundo!")
})

// Ruta para listar todos los productos

app.get("/products", async (req,res) =>{

    // se guarda el query limit
let  limit = req.query.limit;
const productos = await manager.getProducts()
if (limit){
        res.send(productos.slice(0,limit))
    }else{
        res.send(productos)
    }
    // // const productos = await manager.getProducts()
    // res.send({status:"success",productos})
})

// ruta para el id
app.get("/products/:pid", async(req,res)=>{
    const id = req.params.pid
    // console.log('id')
    // console.log(id)
    // console.log(typeof id)
    // const idConvertido = parseInt(id)
    // console.log(typeof idConvertido)
    // const idEncontrado = await manager.getProductById(idConvertido)
    // una forma mas eficiente fue 
    const idEncontrado = await manager.getProductById(parseInt(id))
    res.send(idEncontrado)
})
//  Listen

app.listen(PUERTO,()=>{
    console.log("escuchando el puerto 8080")
})