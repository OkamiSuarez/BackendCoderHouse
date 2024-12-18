const express  = require('express')
const app = express();
const PUERTO = 8080;

// middleware
app.use(express.json())
// se declara al server que se va a trabajar con JSON
app.use(express.urlencoded({extended: true}))


// importando el productManager
const ProductManager = require("./managers/product-manager.js");
const manager = new ProductManager("./src/data/productos.json")

// importando el cartManager
const CartManager = require("./managers/cart-manager.js");
const cart = new CartManager("./src/data/cart.json")

// rutas
app.get('/',(req,res)=>{
    res.send("Hola mundo!")
})

// Ruta para listar todos los productos
app.get("/api/products", async (req,res) =>{
    // se guarda el query limit
    const productos = await manager.getProducts();
    let limit = req.query.limit;
        if (limit){
            res.send(productos.slice(0,limit))
            console.log('haciendo el query limit')
        }else{
            res.send(productos)
        }
})

// ruta para el id
app.get("/api/products/:pid", async(req,res)=>{
    const id = req.params.pid
    const idEncontrado = await manager.getProductById(parseInt(id))
    res.send(idEncontrado)
})

// ruta  POST
app.post("/api/products", async(req,res)=>{
    const nuevoProducto = req.body; 
    // si id existe o status no existe, mandar error  
    if(nuevoProducto.id !== undefined){
        res.status(404).send({status:'Failure',mensaje:'Producto no agregado,  ID  NO SE PUEDE INGRESAR'})
    }else if(nuevoProducto.status === undefined){
        res.status(404).send({status:'Failure',mensaje:'Producto no agregado,  STATUS ES OBLIGATORIO'})
    }else{
        manager.addProduct(nuevoProducto)
        res.status(200).send({status:'success',mensaje:'Producto agregado'})
    }

})

// Ruta PUT
app.put("/api/products/:id", async(req,res)=>{
    const productos = await manager.getProducts();
    let id = req.params.id
    const {title,description,code,price,status,stock,category,thumbnails}  = req.body;
    const productIndex = productos.findIndex(producto => producto.id == id)
    if(req.body.id){
        res.status(401).send({status:'Failure',mensaje:'NO SE AUTORIZA EL CAMBIO DE IDS'})
        
    }else if(productIndex !== -1){
        productos[productIndex].title = title;
        productos[productIndex].description =  description;
        productos[productIndex].code = code;
        productos[productIndex].price = price;
        productos[productIndex].status = status;
        productos[productIndex].stock = stock;
        productos[productIndex].category = category;
        productos[productIndex].thumbnails = thumbnails;
        
        res.status(202).send({status:'Success',mensaje:'Producto Actualizado'})
        manager.guardarArchivo(productos)

    }else{
        res.status(404).send({status:'Failure',mensaje:'Producto no encontrado'})
    }
})

// ruta DELETE
app.delete("/api/products/:pid", async(req,res)=>{
    const productos = await manager.getProducts();
    let id = req.params.pid
    let productIndex = productos.findIndex(producto => producto.id == id)

    if(productIndex !== -1){
        productos.splice(productIndex,1);
        res.status(202).send({status:'Success',mensaje:'Producto eliminado'})
        manager.guardarArchivo(productos)
    }else{
        res.status(404).send({status:'Failure',mensaje:'Producto no encontrado'})
    }
})

// RUTEO DE CART

app.get("/api/carts", async(req,res)=>{
    const carrito = await cart.getProducts();
    // const carrito = carritoTest
    res.status(200).send({status:'Success',mensaje:'Productos en el carrito  encontrados',carrito})
})

// ruta de carrito para  id
app.get("/api/carts/:cid", async (req,res)=>{
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
    res.status(200).send({status:'success', idEncontrado})
    // res.send(idEncontrado)
    // res.status(200)
})

// ruta para post
// SI ID EXISTE, ENTONCES PRODUCTO.QTY  ++
app.post("/api/carts", async(req,res)=>{
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
app.post("/:cid/product/:pid",  async(req,res)=>{

})
// CADA VEZ QUE  LE HAGA UNA INSTANCIA SE TIENE QUE CREAR UN ID AUTOINCREMENTAL











//  Listen
app.listen(PUERTO,()=>{
    console.log("escuchando el puerto 8080")
})