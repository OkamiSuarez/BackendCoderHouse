import { Router } from "express";
const router = Router()

// IMPORTACION DEL MODEL PARA LA DB
import cartModel from "../models/cart.model.js";
// NUEVA INFORMACION CON MONGODB PARA LA ENTREGA
// ruta get
router.get("/", async(req,res)=>{
    try {
        const getCart = await cartModel.find()
        res.send(getCart)
    } catch (error) {
        res.status(500).json({mensaje:'Error al obtener el cart'})
    }
})


// ruta para post
router.post("/", async(req,res)=>{
    // console.log('intento de post')

    try {
        const addCart = new cartModel(req.body)
        await addCart.save()
        res.send({mensaje:'Producto agregado al carrito exitosamente',addCart})
    } catch (error) {
        res.status(500).json({mensaje:'Error al agregar un producto al carrito'})
    }
})

// ruta put para actualizar por ID
router.put("/:id",async(req,res) =>{
    try {
        const putCart = await cartModel.findByIdAndUpdate(req.params.id,req.body)
        res.send("Producto actualizado")
    } catch (error) {
        res.status(500).send("no se pudo actualizar")
    }
})

// ruta para eliminar por id
router.delete("/:id", async(req,res)=>{
    try {
        const delCart = await cartModel.findByIdAndDelete(req.params.id)
        if (!delCart) {
            return res.json({
                error: "Producto no encontrado por ID"
            });
        }
        res.send('Producto eliminado')
    } catch (error) {
        res.status(500).send("no se pudo eliminar el Producto")
    }
})

// ruta de carrito para  id
router.get("/:cid", async (req,res)=>{
    // const cartId = parseInt(req.params.cid)

    // try {
    //     const carritoBuscado = await manager.getCarritoById(cartId);
    //     res.json(carritoBuscado.products)
    // } catch (error) {
    //     res.status(500).json({error:'Error en la existencia de id'})
    // }
})


// ruta para agregar producto seleccionado
router.post("/:cid/product/:pid",  async(req,res)=>{
    // const cartId = parseInt(req.params.cid);
    // const productId = req.params.pid;
    // const qty = req.body.qty || 1;

    // try {
    //     const  actualizarCarrito = await manager.agregarProductoAlCarrito(cartId,productId,qty)
    //     res.json(actualizarCarrito.products)
    // } catch (error) {
    //     res.status(500).json({error:'Error en el agregado de productos'})
    // }
})

export default router






// import CartManager from "../managers/cart-manager.js"
// const manager = new CartManager("./src/data/cart.json")

            // // ruta para post
            // router.post("/", async(req,res)=>{
            //     try {
            //         const nuevoCarrito = await manager.crearCarrito()
            //         res.json(nuevoCarrito)
            //     } catch (error) {
            //         res.status(500).json({error:'Error al crear carrito'})
            //     }
            // })

            // // ruta get
            // router.get("/", async(req,res)=>{
            //     const products = await manager.getCarrito()
            //     let limit = req.query.limit;
            //     if (limit){
            //         res.send(products.slice(0,limit))
            //         console.log('haciendo el query limit')
            //     }else{
            //         res.send(products)
            //     }
            // })

            // // ruta de carrito para  id
            // router.get("/:cid", async (req,res)=>{
            //     const cartId = parseInt(req.params.cid)

            //     try {
            //         const carritoBuscado = await manager.getCarritoById(cartId);
            //         res.json(carritoBuscado.products)
            //     } catch (error) {
            //         res.status(500).json({error:'Error en la existencia de id'})
            //     }
            // })


            // // ruta para agregar producto seleccionado
            // router.post("/:cid/product/:pid",  async(req,res)=>{
            //     const cartId = parseInt(req.params.cid);
            //     const productId = req.params.pid;
            //     const qty = req.body.qty || 1;

            //     try {
            //         const  actualizarCarrito = await manager.agregarProductoAlCarrito(cartId,productId,qty)
            //         res.json(actualizarCarrito.products)
            //     } catch (error) {
            //         res.status(500).json({error:'Error en el agregado de productos'})
            //     }
            // })
// CADA VEZ QUE  LE HAGA UNA INSTANCIA SE TIENE QUE CREAR UN ID AUTOINCREMENTAL
