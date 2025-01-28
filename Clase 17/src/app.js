/* Moongo avanzado 2 
    Agregaciones 
        Multiples operaciones sobre multiples documentos
            Realizar un conjunto de pasos donde cada uno es un paso a realizar
            se representa con un objeto [{stage},{stage},{stage}]
            Principales stage
                $count
                $group
                $limit
                $lookup
                $set/$addfields

    Paginacion
    TP final y consignas
*/

import mongoose from "mongoose";

// paginacion
    // importar 
import { paginate } from "mongoose-paginate-v2";
import OrderModel from "./models/order.model.js";

const main = async ()=>{
    mongoose.connect("mongodb+srv://okami97backdev:coderhouse@cluster0.tfr60.mongodb.net/MongoAvanzado2?retryWrites=true&w=majority&appName=Cluster0")

    // const resultado = await OrderModel.find()
    // console.log(resultado)

    // Calcular el total de pizzas vendidas por sabor en tamano familiar
    // const resultado = await OrderModel.aggregate([
    //     {
    //         // primer stage
    //             // Matchear con el tamano familiar
    //         $match: {
    //             tam: "familiar"
    //         }
    //     },
    //     {
    //         // segundo stage
    //             // Agrupar
    //         $group:{
    //             _id: "$nombre",
    //             total: {
    //                 $sum: "$cantidad"
    //             }
    //         }
    //     },
    //     {
    //         // agrupando de menor a mayor
    //         $sort: {
    //             total : -1
    //         }
    //     },
    //     {
    //         $group:{
    //             _id: 1,
    //             orders: {
    //                     $push: "$$ROOT"
    //                 // root hace referencia al documento actual
    //             }
    //         }
    //     },
    //     // ya agrupados los datos se guardan en una coleccion
    //     {
    //         $project:{
    //             _id: 0,
    //             orders: "$orders"
    //             // el campo orders es igual a los resultados que guardamos en el paso anterior
    //         }
    //     },
    //     // ultimo paso es hacer el merge
    //     {
    //         $merge:{
    //             into: "reports"
    //         }
    //     }
    // ])
    
    const resultado = await OrderModel.paginate({"tam":"familiar"},{limit :2,page: 1})

    console.log(resultado)
}

// main();

// generando un peque;o server 
import express from "express";
const app = express()
const PUERTO = 8080
import { engine } from "express-handlebars";
mongoose.connect("mongodb+srv://okami97backdev:coderhouse@cluster0.tfr60.mongodb.net/MongoAvanzado2?retryWrites=true&w=majority&appName=Cluster0")


// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// express handlebars
app.engine("handlebars",engine())
app.set("view engine", "handlebars")
app.set("views","./src/views")

// rutas
app.get("/pizzas", async(req,res)=>{
    const page = req.query.page ||1
    const limit=2
    // res.send("pizza")

    const pizzas = await OrderModel.paginate({},{limit: 2,page:1})

    // recuperando los docs 
    const pizzasResultadoFinal = pizzas.docs.map(
        pizza =>{
            const {_id, ...rest} = pizza.toObject()
            return rest
        }
    )
    res.render("pizzas",{
        pizzas: pizzasResultadoFinal,
        hasPrevPage: pizzas.hasPrevPage,
        hasNextPage: pizzas.hasNextPage,
        prevPage: pizzas.prevPage,
        nextPage: pizzas.nextPage,
        totalPages: pizzas.totalPages
    })
})

app.listen(PUERTO,()=> console.log("si funciona"))