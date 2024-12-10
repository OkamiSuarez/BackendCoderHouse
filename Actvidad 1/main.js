// Actividad 1

class ProductManager {

    static ultID = 0;

    constructor(path){
        this.products = [];
        this.path = path;
    }
    addProduct(title,description,price,img,code,stock){
        //validando que se agregaron todos los campos
        if(!title || !description || !price || !img || !code || !stock){
            console.log('Todos los campos son obligatorios');
            return;
        }

        // Validar que el codigo sea unico 
        if(this.products.some(item => item.code === code)){
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
        this.products.push(nuevoProducto)

    }
    getProducts(){
        return this.products;
    }
    getProductById(id){
        const producto = this.products.find(item => item.id === id)
        if (!producto){
            console.error('Not found')
        }else{
            console.log(producto)
        }
    }
}

// testing
// Se creará una instancia de la clase “ProductManager”

const manager = new ProductManager()

// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []

console.log(manager.getProducts())

// Se llamará al método “addProduct” con los campos:
// title: “producto prueba”
// description:”Este es un producto prueba”
// price:200,
// thumbnail:”Sin imagen”
// code:”abc123”,
// stock:25

manager.addProduct('producto prueba','Este es un producto prueba',200,'Sin imagen','abc123',25)


// El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
// Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log(manager.getProducts())
// Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
manager.addProduct('producto prueba','Este es un producto prueba',200,'Sin imagen','abc123',25)

// Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
console.log('prueba de ID')
manager.getProductById(1)
console.error('prueba de ID MAL')
manager.getProductById(2)