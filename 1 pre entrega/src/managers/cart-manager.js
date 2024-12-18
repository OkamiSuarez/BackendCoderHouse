// const fs = require('fs').promises
import { error } from "console";
import {promises as fs} from "fs"

class CartManager {
    constructor(path){
        this.carts = [];
        this.path = path;
        this.ultID = 0;

        // cargar carritos almacenados en el archivo
        this.cargarCarritos();
    }

    // cargar carritos en el sistema
    async cargarCarritos(){
        try {
            const data = await fs.readFile(this.path, "utf-8")
            this.carts = JSON.parse(data)

            if (this.carts.length > 0) {
                // verificar si carrito esta creado
                this.ultID = Math.max(this.carts.map(cart => cart.id))
                // se hizo  uso del map para crear un nuevo array con los ids del carrito y con math sale el mayor 
            }

        } catch (error) {
            // si  no existe, se crea
            await this.guardarCarritos()
        }
    }

    // guardar carritos en el sistema va a crear el carro
    async guardarCarritos(){
        await fs.writeFile(this.path, JSON.stringify(this.carts,null,2))
    }

    // Metodos de consigna
    async crearCarrito(){
        const nuevoCarrito = {
            id: ++this.ultID,
            products: []
        }
        this.carts.push(nuevoCarrito)
        
        // se guarda  entonces el array  en el archivo
        await this.guardarCarritos();
        return nuevoCarrito;
}

    // cargar carritos en el sistema
    async getCarritoById(cartId){
        const carrito = this.carts.find(carrito => carrito.id === cartId);
        if (!carrito) {
            throw new Error("No existe un carrito con ese id")
        } else {
            return carrito
        }
    }
        // cargar carritos en el sistema
        async agregarProductoAlCarrito(cartId, productId, qty = 1){
            const carrito = await this.getCarritoById(cartId)
            // Verificamos entonces si el producto ya existe
            const existeProducto = carrito.products.find(prod =>prod.product === productId)
            // si ya esta agregado al carrito se aumenta la qty, si  no se pushea
            if (existeProducto) {
                existeProducto.qty += qty
            } else {
                carrito.products.push({product:productId, qty})
            }
            await  this.guardarCarritos();
            return carrito
        }
}




// class  CartManager{
//     static ultId = 0

//     constructor(path){
//         this.products = []
//         this.path = path
//     }
    
//     // funcion para obtener productos
//     async getProducts(){
//         const arrayProductos = await this.leerArchivo()
//         return arrayProductos
//     }
//     // funcion para obtener productos por id
//     async getProductById(id){
//         const arrayProductos = await this.leerArchivo()
//         const producto = arrayProductos.find(producto=>producto.id === id)
//         if (!producto){
//             return null
//         }else{
//             return producto
//         }
//     }
//     // funcion de guardado
    
//     // funcion para agregar un producto 
// //     •	La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura:
// // •	Id:Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
// // •	products: Array que contendrá objetos que representen cada producto
//     async addProduct({title='',qty=1}){
//         const  arrayProductos = await this.leerArchivo()

//         if(!title || !qty){
//             console.error('LOS CAMPOS SON OBLIGATORIOS')
//             return
//         // }else if (arrayProductos.some(item => item.id === id)){
//         //     return arrayProductos.qty = +1
//             // return qty+1
//         }else{
//             const nuevoProducto = {
//                 id: ++CartManager.ultId,
//                 title,
//                 qty
//             }
//             console.log('Archivo agregado al carrito')
//             arrayProductos.push(nuevoProducto)
//             await this.guardarArchivo(arrayProductos)
//         }
//     }

//     // en el after este es nombrado como guardarCarritos
//     async guardarArchivo(arrayProductos){
//         try{
//             await fs.writeFile(this.path, JSON.stringify(arrayProductos,null,2))
//         }
//         catch(error){
//             console.error('Error al guardar el archivo')
//         }
//     }
//     // funcion de  lectura
//     // en el  after este es nombrado como cargar carrito 
//     async leerArchivo(){
//         try{
//             const respuesta =  await fs.readFile(this.path, 'utf-8')
//             const arrayProductos = JSON.parse(respuesta)
//             return  arrayProductos
//         }
//         catch(error){
//             console.log('error  al leer el cart manager')
//         }
//     }

// }

export default CartManager
// module.exports = CartManager