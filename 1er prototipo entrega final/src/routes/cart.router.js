import { Router } from "express";
const router = Router()
import CartManager from "../managers/cart-manager.js"
const manager = new CartManager("./src/data/cart.json")
// IMPORTACION DEL MODEL PARA LA DB
import cartModel from "../models/cart.model.js";
import productModel from "../models/products.model.js";
import { get } from "http";
// NUEVA INFORMACION CON MONGODB PARA LA ENTREGA
// ruta get
router.get("/", async (req, res) => {
    try {
        const getCart = await cartModel.find()
        res.send(getCart)
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el cart' })
    }
})

// ruta de carrito para  id
router.get("/:cid", async (req, res) => {

    try {
        const getCart = await cartModel.findById(req.params.cid).populate('products.product').lean()
        res.send(getCart)
    } catch (error) {
        res.status(500).send("no se pudo actualizar")
    }

    // const cartId = parseInt(req.params.cid)

    // try {
    //     const carritoBuscado = await manager.getCarritoById(cartId);
    //     res.json(carritoBuscado.products)
    // } catch (error) {
    //     res.status(500).json({error:'Error en la existencia de id'})
    // }
})

// ruta para post
router.post("/", async (req, res) => {
    // console.log('intento de post')

    try {
        const addCart = new cartModel(req.body)
        await addCart.save()
        res.send({ mensaje: 'Carrito creado exitosamente', addCart })
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al agregar un producto al carrito' })
    }
})

// ruta para agregar producto seleccionado
router.post("/:cid/product/:pid", async (req, res) => {

    // CREAR CARRITO CON POPULATE 

    try {
        const getCart = await cartModel.findById(req.params.cid)
        const getProduct = await productModel.findById(req.params.pid)
        getCart.products.push({
            product: getProduct,
            quantity: 1
        })
        await getCart.save()
        res.send({ mensaje: "producto agregado", getCart })
        // const cartSearch = findById(cartId)
        // const productSearch = findById(productId)
        // cartSearch.product
        // res.send(cartSearch)
        // console.log('cartSearch')
    } catch (error) {
        console.log(error)
    }

    // try {
    //     const  actualizarCarrito = await manager.agregarProductoAlCarrito(cartId,productId,qty)
    //     res.json(actualizarCarrito.products)
    // } catch (error) {
    //     res.status(500).json({error:'Error en el agregado de productos'})
    // }
})

// ruta put para actualizar por ID
router.put("/:cid", async (req, res) => {
    try {
        const putCart = await cartModel.findByIdAndUpdate(req.params.cid, req.body)
        res.send("Producto actualizado")
    } catch (error) {
        res.status(500).send("no se pudo actualizar")
    }
})

// ruta para eliminar por id
router.delete("/:cid", async (req, res) => {
    try {
        const delCart = await cartModel.findByIdAndDelete(req.params.cid)
        if (!delCart) {
            return res.json({
                error: "Producto no encontrado por ID"
            });
        }
        res.send('Producto eliminado')
    } catch (error) {
        res.status(500).send("no se pudo eliminar el carrito")
    }
})

// ruta 2 para eliminar por id de carrito y producto 
router.delete("/:cid/products/:pid", async (req, res) => {
    // Eliminar el carrito del producto seleccionado
    try {
        // const getCart = await cartModel.findById(req.params.cid)
        // const getProduct = await productModel.findById(req.params.pid)
        const cartId = req.params.cid;
        const productId = req.params.pid;

        const updatedCart = await cartModel.findByIdAndUpdate(
            cartId,
            { $pull: { products: { "_id": productId } } },
            { new: true }
        ).populate('products.product');
        // await getCart.save()
        if (!updatedCart) {
            return res.status(404).json({ mensaje: "Carrito no encontrado" });
        }
        res.send({ mensaje: "producto eliminado", updatedCart })
        // const cartSearch = findById(cartId)
        // const productSearch = findById(productId)
        // cartSearch.product
        // res.send(cartSearch)
        // console.log('cartSearch')
    } catch (error) {
        console.log(error)
    }

    // try {
    //     const delCart = await cartModel.findByIdAndDelete(req.params.id)
    //     if (!delCart) {
    //         return res.json({
    //             error: "Producto no encontrado por ID"
    //         });
    //     }
    //     res.send('Producto eliminado')
    // } catch (error) {
    //     res.status(500).send("no se pudo eliminar el Producto")
    // }
})

// ruta put para actualizar por ID
router.put("/:cid/products/:pid", async (req, res) => {
    // SOLO LA QTY LA EDITA
    // RECIBIR Y MODIFICAR NADA MAS ESO 

    try {
        // const getCart = await cartModel.findById(req.params.cid)
        // const getProduct = await productModel.findById(req.params.pid)
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const { quantity } = req.body
        if (!quantity || quantity < 0) {
            return res.status(400).json({ mensaje: "Cantidad inválida" });
        }
        const updatedCart = await cartModel.findOneAndUpdate(
            {
                _id: cartId,
                "products._id": productId
            },
            {
                $set: {"products.$.quantity": quantity} 
            },
            {
                new: true
            }
        ).populate('products.product');;
        // await getCart.save()
        res.send({ mensaje: "producto actualizado", updatedCart })
        // const cartSearch = findById(cartId)
        // const productSearch = findById(productId)
        // cartSearch.product
        // res.send(cartSearch)
        // console.log('cartSearch')
    } catch (error) {
        console.log(error)
    }

    // try {
    //     const putCart = await cartModel.findByIdAndUpdate(req.params.id,req.body)
    //     res.send("Producto actualizado")
    // } catch (error) {
    //     res.status(500).send("no se pudo actualizar")
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
