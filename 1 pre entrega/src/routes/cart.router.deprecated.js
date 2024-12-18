import { Router } from "express";
const router = Router()

import CartManager from "../managers/cart-manager.js"
const cart = new CartManager("./src/data/cart.json")


// // importando el cartManager
// // const CartManager = require("./managers/cart-manager.js");
// // import CartManager from ""
// const cart = new CartManager("./src/data/cart.json")
// const cart = new CartManager("./src/data/cart.json")


// RUTEO DE CART

router.get("/", async(req,res)=>{
    const carrito = await cart.getProducts();
    // const carrito = carritoTest
    res.status(200).send({status:'Success',mensaje:'Productos en el carrito  encontrados',carrito})
})

// ruta de carrito para  id
router.get("/:cid", async (req,res)=>{
    // const carrito = carritoTest
    // res.send(req.params.id)
    // const id = req.params.cid;
    // console.log(id);
    // console.log(carrito);
    
    // NO ESTA  AGARRANDO EL  REQ  PARAMS
    
    // const idCarts = await carrito.getProductById(parseInt(id))
    // otroID = id
    // const idCarts = carrito.otroID
    // res.send(idCarts)
    // console.log('Get de id')
    const id = req.params.cid;
    const idEncontrado = await cart.getProductById(parseInt(id))
    // console.log(idEncontrado)
    if(idEncontrado === null){
        res.status(400).send({status:'Failure', message:'ID not found'})
    }else{
        res.status(200).send({status:'Success', idEncontrado})
    }
    // res.send(idEncontrado)
    // res.status(200)
})

// ruta para post
// SI ID EXISTE, ENTONCES PRODUCTO.QTY  ++
router.post("/", async(req,res)=>{
    const productos = await cart.getProducts();
    // const  carrito = carritoTest
    console.log('request de post')
    const nuevoProducto = req.body;
    console.log(nuevoProducto)
    // manager.addProduct(nuevoProducto)
    // productos.push(nuevoProducto)
    cart.addProduct(nuevoProducto)
    console.log(productos)
    res.send('producto agregado')
    // aqui  tampoco esta funcionando, el codigo base  ya  esta entonces  hay que nada mas hacer el filesystem
})

// ruta para agregar producto seleccionado
router.post("/:cid/product/:pid",  async(req,res)=>{

})
// CADA VEZ QUE  LE HAGA UNA INSTANCIA SE TIENE QUE CREAR UN ID AUTOINCREMENTAL

export default router