console.log('funciona')
// desestructuracion

const pelicula = {
    titulo: "El Padrino",
    director: "Francis Ford Coppola",
    genero: "Drama",
    lanzamiento: 1972
}


let tituloPelicula = pelicula.titulo
console.log(tituloPelicula)
//  es lo mismo que console.log(pelicula.titulo)

// la desestructuracion crea variables globales ......
let {director, genero, lanzamiento} = pelicula
// se nombran los keys y se igualan a su lider o a su padre o a su objeto
console.log(director)
console.log(genero)
console.log(lanzamiento)

director = "Clint Eastwood"
console.log(director)
console.log(pelicula)

// el simbolo del objeto es el {} el de array es []

const numeros = [1,2,3,4,5]

// aplicando el destructuring
// let [indiceCero,indiceUno,indiceDos,indiceTres,indiceCuatro] = numeros
// console.log(indiceCero)
// console.log(indiceDos)
// console.log(indiceTres)
// console.log(indiceCuatro)

// o tambien
let [,,,,indiceCuatro] = numeros
console.log(indiceCuatro)

// ejemplo de una funcion 

// function saludo(nombre){
//     console.log(`Hola ${nombre}`)
// }

saludo('Oka')
saludo()
// para poner un default
function saludo(nombre='Usuario'){
    console.log(`Hola ${nombre}`)
}

// Trabajo por modulo
// Para importar el array de productosMariolo 

import productosMarolio from "./datos.js"

console.log(productosMarolio)

// clases

class Persona {
    constructor(nombre,apellido,edad){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }

    saludar(){
        console.log(`Hola, soy ${this.nombre} de ${this.apellido}`)
    }
}

// como se crea el objeto

const personita = new Persona('doble','LuisMiguel',20)
console.log(personita)
personita.saludar()

const pepe = new Persona('elPepe', 'jimenez', 20)
const chucho = new Persona('chuchin','Perez',40)
pepe.saludar()
chucho.saludar()

// creando clase estudiante PARA QUE HEREDE LO DE PERSONA

// SI QUIERO QUE PROMEDIO SEA UNA VARIABLE PRIVADA
// TENGO QUE AGREGARLE EL  # ANTES del nombre de la variable
// para poder ACCEDER se usa un get/set, QUEDO PENDIENTEEEEEEEEE

class Estudiante extends Persona{
    #promedio
    // se USO el extend para traer lo que ya estaba en objeto persona
    constructor(nombre,apellido,edad,carrera,promedio){
        // se usa la palabra super para TRAER LO QUE YA EXISTE
        super(nombre,apellido,edad)
        this.carrera=carrera;
        this.#promedio=promedio;
    }
}

const estudiante = new Estudiante('Juan','Perez', 20, 'Ing. sistemas', 10)
console.log(estudiante)
// tambien se hereda el metodo
estudiante.saludar()

console.log(estudiante.promedio)
// Puedo crear variables privadas dentro de las clases, por lo que algunas
// no son accesibles desde el entorno 

// variables y metodos estaticos 
// para volverla estatica usamos static
class Contador {
    static cantidad = 0;
// cada vez que use new cantidad se incrementa en 1
    constructor(){
        // lo que hacemos es mandar llamar a la clase y ahi aumentamos
        Contador.cantidad++

    }

    static obtenerCantidad(){
        return Contador.cantidad;
    }
}
const contador1 = new Contador(); //la var cantidad se incrementa
console.log(Contador.obtenerCantidad())
const contador2 = new Contador(); //la var cantidad se incrementa
const contador3 = new Contador(); //la var cantidad se incrementa
console.log(Contador.obtenerCantidad())
// aqui lo que pasa es que cada vez que se usa un new
// se aumenta el contador 


// con la update de ES7 hay operador de exponente **
// y el includes, que permite saber si hay un elemento
// dentro de un array o string 

// con ES8 llega el object values

const empleado = {
    nombre: 'pepe',
    apellido : 'argento',
    edad : 45,
    puesto:'vendedor zapatos'
}

const resultadoEmpleadoValues = Object.values(empleado)
console.log(resultadoEmpleadoValues)
// object,entries devolvera un array de arrays donde cada sub array tiene
// la clave y valor 
const resultadoEmpleadoEntries = Object.entries(empleado)
console.log(resultadoEmpleadoEntries)