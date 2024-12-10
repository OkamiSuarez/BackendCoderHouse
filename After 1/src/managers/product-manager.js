// Actividad 2

const fs = require('fs').promises
// esto de arriba se hace por que se van a usar promesas
// con ES Modules  es import {promises as fs} from fs


class ProductManager {

    static ultID = 0;

    constructor(path){
        this.products = [];
                // nueva info
        this.path = path;
    }
    async addProduct({title,description,price,img,code,stock}){

        // tambien se puede leer el archivo y guardar el array con los productos
        const arrayProductos = await this.leerArchivo()

        //validando que se agregaron todos los campos
        if(!title || !description || !price || !img || !code || !stock){
            console.log('Todos los campos son obligatorios');
            return;
        }

        // Validar que el codigo sea unico 
        if(arrayProductos.some(item => item.code === code)){
            console.log('el codigo debe ser unico');
            return;
        }

        
        // si pasamos las validaciones se crea el objeto
        const nuevoProducto = {
            id: ++ProductManager.ultID,
            title,
            description,
            price,
            img,
            code,
            stock
        }

        // ya creado se pushea al array 
        arrayProductos.push(nuevoProducto)

        // ya que se agrego el nuevo producto al array se guarda el array al archivo
        await this.guardarArchivo(arrayProductos)
    }
    async getProducts(){
        // return this.products;
        const arrayProductos = await this.leerArchivo()
        return arrayProductos
    }
    async getProductById(id){
        // primero leo el archivo y genero el array 
        const arrayProductos = await this.leerArchivo()
        const producto = arrayProductos.find(item => item.id === id)
        // const producto = this.products.find(item => item.id === id)
        if (!producto){
            return 'Not found'
        }else{
            return producto
        }
    }
    // Se pueden armar metodos auxiliares que guarden el archivo y recuperen los datos 

    async guardarArchivo (arrayProductos){
        try{
            await fs.writeFile(this.path, JSON.stringify(arrayProductos,null, 2))
            // el null y el 2 lo que hace es acomodarlos en un formato mas legible
        }
        catch(error){
            console.error('error al guardar el archivo')
        }
    }
    async leerArchivo(){
        try{
            const respuesta = await fs.readFile(this.path, 'utf-8')
            const arrayProductos = JSON.parse(respuesta)
            return arrayProductos
        }
        catch(error){
            console.log("error al leer el archivo")
        }
    }
}

module.exports = ProductManager

// // testing
// // Se creará una instancia de la clase “ProductManager”

// const manager = new ProductManager()

// // Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []

// console.log(manager.getProducts())

// // Se llamará al método “addProduct” con los campos:
// // title: “producto prueba”
// // description:”Este es un producto prueba”
// // price:200,
// // thumbnail:”Sin imagen”
// // code:”abc123”,
// // stock:25

// manager.addProduct('producto prueba','Este es un producto prueba',200,'Sin imagen','abc123',25)


// // El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
// // Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
// console.log(manager.getProducts())
// // Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
// manager.addProduct('producto prueba','Este es un producto prueba',200,'Sin imagen','abc123',25)

// // Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
// console.log('prueba de ID')
// manager.getProductById(1)
// console.error('prueba de ID MAL')
// manager.getProductById(2)


// module.exports = ProductManager