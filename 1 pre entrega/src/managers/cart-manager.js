const fs = require('fs').promises
class  CartManager{
    static ultId = 0

    constructor(path){
        this.products = []
        this.path = path
    }

    // funcion para agregar un producto 
//     •	La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura:
// •	Id:Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
// •	products: Array que contendrá objetos que representen cada producto
    async addProduct({title='',qty=1}){
        const  arrayProductos = await this.leerArchivo()

        if(!title || !qty){
            console.error('LOS CAMPOS SON OBLIGATORIOS')
            return
        // }else if (arrayProductos.some(item => item.id === id)){
        //     return arrayProductos.qty = +1
            // return qty+1
        }else{
            const nuevoProducto = {
                id: ++CartManager.ultId,
                title,
                qty
            }
            console.log('Archivo agregado al carrito')
            arrayProductos.push(nuevoProducto)
            await this.guardarArchivo(arrayProductos)
        }
    }


    // funcion para obtener productos
    async getProducts(){
        const arrayProductos = await this.leerArchivo()
        return arrayProductos
    }
    // funcion para obtener productos por id
    async getProductById(id){
        const arrayProductos = await this.leerArchivo()
        const producto = arrayProductos.find(producto=>producto.id === id)
        if (!producto){
            return 'Product not found'
        }else{
            return producto
        }
    }
    // funcion de guardado
    async guardarArchivo(arrayProductos){
        try{
            await fs.writeFile(this.path, JSON.stringify(arrayProductos,null,2))
        }
        catch(error){
            console.error('Error al guardar el archivo')
        }
    }
    // funcion de  lectura
    async leerArchivo(){
        try{
            const respuesta =  await fs.readFile(this.path, 'utf-8')
            const arrayProductos = JSON.parse(respuesta)
            return  arrayProductos
        }
        catch(error){
            console.log('error  al leer el cart manager')
        }
    }

}

module.exports = CartManager