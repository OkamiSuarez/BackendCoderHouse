console.log('funciona')

const Okami = {
    nombre:'Okami',
    apellido:'Suarez',
    direccion:'Casa',
    edad:26,
    empleado:true
}

console.log(Okami)
console.log(Okami.empleado)
console.log(Okami.edad)
console.log(Object.values(Okami))
console.log(Object.entries(Okami))
console.log(Object.keys(Okami))

Okami.edad = Okami.edad+1
console.log(Okami.edad)

function Coche(nombre,modelo,color,tipo){
    this.nombre=nombre;
    this.modelo=modelo;
    this.color=color;
    this.tipo=tipo;
    this.presentacion=function(){
        console.log(`El coche a continuacion es el ${this.nombre} del modelo ${this.modelo} color ${this.color} y es un ${this.tipo}`)
    }
}

const mazda = new Coche('cx-30',2022,'rojo','suv')
console.log(mazda)
mazda.presentacion()
// class Coche {
//     constructor(nombre, modelo, color, tipo) {
//         this.nombre = nombre
//         this.modelo = modelo
//         this.color = color
//         this.tipo = tipo
//     }
// }

for(const propiedad in mazda){
    console.log(propiedad)
    console.log(mazda[propiedad])
}

// CLASES CONSTRUCTORAS 
class Tarjeta {
    constructor(numero, saldo, tipo, activa) {
        this.numero = numero;
        this.saldo = saldo;
        this.tipo = tipo;
        this.activa = activa;
    }
    comprar(){

    }
    depositar(){
        
    }
}

class ProductManager {
    constructor(title,description,price,thumbnail,code,stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
    addProduct(){

    }
    getProducts(){

    }
    getProductById(){

    }
    
}