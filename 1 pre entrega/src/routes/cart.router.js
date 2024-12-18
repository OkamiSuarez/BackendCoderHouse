import { Router } from "express";
const router = Router()

import CartManager from "../managers/cart-manager.js"
const manager = new CartManager("./src/data/cart.json")

// ruta para post
router.post("/", async(req,res)=>{
    try {
        const nuevoCarrito = await manager.crearCarrito()
        res.json(nuevoCarrito)
    } catch (error) {
        res.status(500).json({error:'Error al crear carrito'})
    }
})

// ruta get
// ruta de carrito para  id
router.get("/:cid", async (req,res)=>{
    const cartId = parseInt(req.params.cid)

    try {
        const carritoBuscado = await manager.getCarritoById(cartId);
        res.json(carritoBuscado.products)
    } catch (error) {
        res.status(500).json({error:'Error en la existencia de id'})
    }
})


// ruta para agregar producto seleccionado
router.post("/:cid/product/:pid",  async(req,res)=>{
    const cartId = parseInt(req.params.cid);
    const productId = req.params.pid;
    const qty = req.body.qty || 1;

    try {
        const  actualizarCarrito = await manager.agregarProductoAlCarrito(cartId,productId,qty)
        res.json(actualizarCarrito.products)
    } catch (error) {
        res.status(500).json({error:'Error en el agregado de productos'})
    }
})
// CADA VEZ QUE  LE HAGA UNA INSTANCIA SE TIENE QUE CREAR UN ID AUTOINCREMENTAL

export default router