import { Router } from "express";
const router = Router()

// iniciamos con DB
import productModel from "../models/products.model.js";

// Ruta para listar todos los productos
router.get("/", async (req,res) =>{
    try {
        const getProduct = await productModel.find()
        
        // inserto limit
        let limit = req.query.limit;
        if (limit){
            res.send(getProduct.slice(0,limit))
            console.log('haciendo el query limit')
        }else{
            // res.send(getProduct.slice(0,10))
            res.send(getProduct)
        }
        // res.send(getProduct)
    } catch (error) {
        res.status(500).json({mensaje:'Error al obtener el product'})
    }
    // // se guarda el query limit
    // const productos = await manager.getProducts();
    // let limit = req.query.limit;
    //     if (limit){
    //         res.send(productos.slice(0,limit))
    //         console.log('haciendo el query limit')
    //     }else{
    //         res.send(productos)
    //     }
})

// ruta para el id
router.get("/:pid", async(req,res)=>{
    // const id = req.params.pid
    // const idEncontrado = await manager.getProductById(parseInt(id))
    // res.send(idEncontrado)
})

// ruta  POST
router.post("/", async(req,res)=>{

    try {
        const addProduct = new productModel(req.body)
        await addProduct.save()
        res.send({mensaje:'Producto agregado al carrito exitosamente',addProduct})
    } catch (error) {
         // Manejar errores específicos
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                mensaje: 'Error de validación',
                detalles: error.message
            });
        }

        if (error.code === 11000) {
            return res.status(400).json({
                mensaje: 'El código del producto ya existe'
            });
        }
        res.status(500).json({mensaje:'Error al agregar un producto', error})
    }

    // const nuevoProducto = req.body; 
    // // si id existe o status no existe, mandar error  
    // if(nuevoProducto.id !== undefined){
    //     res.status(404).send({status:'Failure',mensaje:'Producto no agregado,  ID  NO SE PUEDE INGRESAR'})
    // }else if(nuevoProducto.status === undefined){
    //     res.status(404).send({status:'Failure',mensaje:'Producto no agregado,  STATUS ES OBLIGATORIO'})
    // }else{
    //     manager.addProduct(nuevoProducto)
    //     res.status(200).send({status:'success',mensaje:'Producto agregado, en caso de tener un codigo repetido, no se agregara un nuevo producto'})
    // }

})

// Ruta PUT
router.put("/:id", async(req,res)=>{

    try {
        const putProduct = await productModel.findByIdAndUpdate(req.params.id,req.body)
        res.send("Producto actualizado")
    } catch (error) {
        res.status(500).send("no se pudo actualizar")
    }

    // const productos = await manager.getProducts();
    // let id = req.params.id
    // const {title,description,code,price,status,stock,category,thumbnails}  = req.body;
    // const productIndex = productos.findIndex(producto => producto.id == id)
    // if(req.body.id){
    //     res.status(401).send({status:'Failure',mensaje:'NO SE AUTORIZA EL CAMBIO DE IDS'})
        
    // }else if(productIndex !== -1){
    //     productos[productIndex].title = title;
    //     productos[productIndex].description =  description;
    //     productos[productIndex].code = code;
    //     productos[productIndex].price = price;
    //     productos[productIndex].status = status;
    //     productos[productIndex].stock = stock;
    //     productos[productIndex].category = category;
    //     productos[productIndex].thumbnails = thumbnails;
        
    //     res.status(202).send({status:'Success',mensaje:'Producto Actualizado'})
    //     manager.guardarArchivo(productos)

    // }else{
    //     res.status(404).send({status:'Failure',mensaje:'Producto no encontrado'})
    // }
})

// ruta DELETE
router.delete("/:pid", async(req,res)=>{

    try {
        const delProduct = await productModel.findByIdAndDelete(req.params.pid)
        if (!delProduct) {
            return res.json({
                error: "Producto no encontrado por ID"
            });
        }
        res.send('Producto eliminado')
    } catch (error) {
        res.status(500).send("no se pudo eliminar el Producto")
    }
    // const productos = await manager.getProducts();
    // let id = req.params.pid
    // let productIndex = productos.findIndex(producto => producto.id == id)

    // if(productIndex !== -1){
    //     productos.splice(productIndex,1);
    //     res.status(202).send({status:'Success',mensaje:'Producto eliminado'})
    //     manager.guardarArchivo(productos)
    // }else{
    //     res.status(404).send({status:'Failure',mensaje:'Producto no encontrado'})
    // }
})


export default router




            // // importando el productManager
            // // const ProductManager = require("../managers/product-manager.js");
            // import ProductManager from "../managers/product-manager.js"
            // const manager = new ProductManager("./src/data/productos.json")


            // // Ruta para listar todos los productos
            // router.get("/", async (req,res) =>{
            //     // se guarda el query limit
            //     const productos = await manager.getProducts();
            //     let limit = req.query.limit;
            //         if (limit){
            //             res.send(productos.slice(0,limit))
            //             console.log('haciendo el query limit')
            //         }else{
            //             res.send(productos)
            //         }
            // })

            // // ruta para el id
            // router.get("/:pid", async(req,res)=>{
            //     const id = req.params.pid
            //     const idEncontrado = await manager.getProductById(parseInt(id))
            //     res.send(idEncontrado)
            // })

            // // ruta  POST
            // router.post("/", async(req,res)=>{
            //     const nuevoProducto = req.body; 
            //     // si id existe o status no existe, mandar error  
            //     if(nuevoProducto.id !== undefined){
            //         res.status(404).send({status:'Failure',mensaje:'Producto no agregado,  ID  NO SE PUEDE INGRESAR'})
            //     }else if(nuevoProducto.status === undefined){
            //         res.status(404).send({status:'Failure',mensaje:'Producto no agregado,  STATUS ES OBLIGATORIO'})
            //     }else{
            //         manager.addProduct(nuevoProducto)
            //         res.status(200).send({status:'success',mensaje:'Producto agregado, en caso de tener un codigo repetido, no se agregara un nuevo producto'})
            //     }

            // })

            // // Ruta PUT
            // router.put("/:id", async(req,res)=>{
            //     const productos = await manager.getProducts();
            //     let id = req.params.id
            //     const {title,description,code,price,status,stock,category,thumbnails}  = req.body;
            //     const productIndex = productos.findIndex(producto => producto.id == id)
            //     if(req.body.id){
            //         res.status(401).send({status:'Failure',mensaje:'NO SE AUTORIZA EL CAMBIO DE IDS'})
                    
            //     }else if(productIndex !== -1){
            //         productos[productIndex].title = title;
            //         productos[productIndex].description =  description;
            //         productos[productIndex].code = code;
            //         productos[productIndex].price = price;
            //         productos[productIndex].status = status;
            //         productos[productIndex].stock = stock;
            //         productos[productIndex].category = category;
            //         productos[productIndex].thumbnails = thumbnails;
                    
            //         res.status(202).send({status:'Success',mensaje:'Producto Actualizado'})
            //         manager.guardarArchivo(productos)

            //     }else{
            //         res.status(404).send({status:'Failure',mensaje:'Producto no encontrado'})
            //     }
            // })

            // // ruta DELETE
            // router.delete("/:pid", async(req,res)=>{
            //     const productos = await manager.getProducts();
            //     let id = req.params.pid
            //     let productIndex = productos.findIndex(producto => producto.id == id)

            //     if(productIndex !== -1){
            //         productos.splice(productIndex,1);
            //         res.status(202).send({status:'Success',mensaje:'Producto eliminado'})
            //         manager.guardarArchivo(productos)
            //     }else{
            //         res.status(404).send({status:'Failure',mensaje:'Producto no encontrado'})
            //     }
            // })
