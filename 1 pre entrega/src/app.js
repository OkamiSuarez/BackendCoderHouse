const express  = require('express')
// si no se autocompleta es por que no se ha instalado
const app = express();
const PUERTO = 8080;

// middleware
// Es el cadenero, dice quien pasa o no 
app.use(express.json())
// se declara al server que se va a trabajar con JSON
app.use(express.urlencoded({extended: true}))
// nos permite gestinar multiples datos desde el cliente


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
    console.log('limit')
    console.log(limit)
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
    // app.use(express.json())

    const productos = await manager.getProducts();
    console.log('request de post')
    // console.log(req.body)
    const nuevoProducto = req.body;
    // aqui esta pasando que no me esta recibiendo la data
    // const {productoDestructuring} = nuevoProducto
    // console.log('nuevoProducto')
    // console.log(nuevoProducto.title)
    // console.log(nuevoProducto.code)
    // console.log(nuevoProducto.id)
    // console.log(nuevoProducto.status)
    // console.log('productoDestructuring')
    // console.log(productoDestructuring)
    // manager.addProduct('METODO DE nuevoProducto')
    // productos.push(nuevoProducto)
    // manager.guardarArchivo(productos)
    // OJO el codigo de arriba guarda el  archivo
    
    
    // si id existe o status no existe, mandar error  
    if(nuevoProducto.id !== undefined){
        // console.log( 'ID NO SE PUEDE INGRESAR')
        res.status(404).send({status:'Failure',mensaje:'Producto no agregado,  ID  NO SE PUEDE INGRESAR'})
        
    }else if(nuevoProducto.status === undefined){
        // console.log('STATUS ES OBLIGATORIO')
        res.status(404).send({status:'Failure',mensaje:'Producto no agregado,  STATUS ES OBLIGATORIO'})
    }else{
        manager.addProduct(nuevoProducto)
        res.status(200).send({status:'success',mensaje:'Producto agregado'})
        console.log(productos)
    }

})

// AHORA SI RUTA PUT EMPEZAR DE CERO MEJOR
// EN PUT EVALUAR CON IF SI VIENE UN PRODUCTO CON ID  COMO EN  POST
//          if(nuevoProducto.id !== undefined){
// 
app.put("/api/products/:id", async(req,res)=>{
    const productos = await manager.getProducts();
    let id = req.params.id
    const {title,description,code,price,status,stock,category,thumbnails}  = req.body;
    console.log('req.body.id')
    console.log(req.body.id)
    // ACA arriba hay un error por el destructuring, me manda UNDEFINED
        // PREGUNTAR POR ESTO
    // res.send(id)
    console.log('id')
    console.log(id)
    const productIndex = productos.findIndex(producto => producto.id == id)
    // Mismo  problema con el index, 
    //          YA SE  RESOLVIO
    // lo que sucede es que tenia un triple igual pero eso no se validaba correctamente debido a que el tipo de caracter no  era el mismo  pero si los datos
    console.log(productIndex);
    if(req.body.id){
        console.error('no se pueden mandar ids en un put')
        res.status(401).send({status:'Failure',mensaje:'NO SE AUTORIZA EL CAMBIO DE IDS'})
        
    }else if(productIndex !== -1){
        // DEBERIA VALORAR AQUI QUE ALGO NO TRAIGA DATA? 
        // PREGUNTAR EN LA CLASE
        productos[productIndex].title = title;
        productos[productIndex].description =  description;
        productos[productIndex].code = code;
        productos[productIndex].price = price;
        productos[productIndex].status = status;
        productos[productIndex].stock = stock;
        productos[productIndex].category = category;
        productos[productIndex].thumbnails = thumbnails;
        
        res.status(202).send({status:'Success',mensaje:'Producto Actualizado'})
        console.log(productos)
        manager.guardarArchivo(productos)

    }else{
        res.status(404).send({status:'Failure',mensaje:'Producto no encontrado'})
        console.log('cliente no encontrado, ojito')
    }
})

// ruta para el delete
app.delete("/api/products/:pid", async(req,res)=>{
    const productos = await manager.getProducts();
    let id = req.params.pid
    // const idEncontrado = await manager.getProductById(parseInt(id))
    // console.error(idEncontrado)
// buscando el index
    let productIndex = productos.findIndex(producto => producto.id == id)
// TESTEO  SI  TRAE EL CLIENTE DE PRUEBA
    // let productIndex = productos.findIndex(producto => producto.id === id)
    // console.log('productIndex')
    // console.log(productIndex)
    // res.send(idEncontrado)
// Aqui lo que esta pasando es que no  esta encontrando el array de forma correcta por lo cual hay que  preguntar, hay que seguir  codeando COMO SI ya  hubiera quedado 

// cuando ya tenga el index,debo de eliminar lo que  tienen los productos pero no el objeto, para  no eliminar ids
    if(productIndex !== -1){
        // Si el cliente existe, lo elimino
        productos.splice(productIndex,1);
        console.log(productos)
        res.status(202).send({status:'Success',mensaje:'Producto eliminado'})
        manager.guardarArchivo(productos)

    }else{
        res.status(404).send({status:'Failure',mensaje:'Producto no encontrado'})
    }
    // esto funciona si c ambiamos productos por  clientes, por  lo cual solo  ver como traer la informacion  
    // parece que no esta eliminando el  producto aunque ya le  di el splice
    // creo que  aqui  lo que  esta pasando es que se esta eliminando PERO no se esta mandando eso de vuelta al FS, preguntar
})



// // INFO DE CARRITO PARA MODULARIZAR DESPUES
// // MODULARIZAR, NO  LO OLVIDES
// let carritoTest = [
//     {
//         "id": 1,
//         "title": "Laptop Apple MacBook Pro 14"
//     },
//     {
//         "id": 2,
//         "title": "Smartphone Samsung Galaxy S23"
//     },
//     {
//         "id": 3,
//         "title": "Auriculares Sony WH-1000XM5"
//     }
//     ]


// ruteamos lo de carrito
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