console.log('1')
console.log('2')
console.log('3')
//  como se puede ver arriba, el callstack es en ese orden 

// en el caso de funciones a ver que pez 

function a(){
console.log('a')
}

function b(){
console.log('b')
    
}

function c(){
console.log('c')
    
}

a()
b()
c()

// Programacion asincrona
// no bloquean los flujos de ejecucion 

setTimeout(() =>{
    console.log('primer timer')
}, 2000)

// callback 
// Funcion que pasamos como argumento a otra funcion 
// Funcion que recibe por parametro se llama  
// Funcion que envia por parametro se llama 
// OJO no confundir con FOS, funciones de orden superior 
// FOS: Funcion que recibe a otra funcion como parametro 
// Callback: es la que pasa como argumento a otra funcion 

// ejemplo de callback 
// Aqui solo pasamos la funcion por referencia PORQUE
// si le pusiesemos el () en el parametro, la ponemos a correr de una
function suma(numeroA,numeroB,callback){
    let resultado = numeroA+numeroB
    callback(resultado)
}

function mostrarResultado(resultado){
    console.log('El resultado de su operacion es ' + resultado)
}

// invocar a suma y al callback que sera mostrarResultado 
suma(10,5,mostrarResultado)

let numeros = [1,2,3,4]

let numerosDuplicados = numeros.map((numerito) => numerito *2)
console.log(numerosDuplicados)

// metodo map casero
function mapear (array,callback){
    let arrayNuevo = []

    for (let i=0; i<array.length; i++){
        arrayNuevo.push(callback(array[i]))
    }

    return arrayNuevo
}

// creando el callback

function duplicar(num){
    return num*2
}

console.log('nueva funcion map' + mapear(numeros, duplicar))

// Promesas
// OBJETOS que representan un hecho eventual en el futuro 
// Hecho el cual puede ser exitoso o fallido
// Se utiliza para operaciones asincronicas

// tienen 3 estados
// Pendiente : (pending) estado inicial, ocurre cuando la operacion asincrona todavia
// no se completa ni se rechaza

// Exitoso: (Fullfilled), operacion completada de forma exitosa, la promise se resuelve

// Fallida: (rejected) la operacion asincrona fallo y se rechazo la promesa

// creacion de la promesa
// Se instancia una promise que espera una callback
const promesa = new Promise((resolved,rejected)=>{
    // aqui va el codigo
    // Resolve y Reject son func que nos proveen la promesa para indicar el estado de la misma

    // Caso exitoso
    // resolved('exito en la promesa, llego la camiseta de messi')

    // caso de error
    rejected('Error en la promesa, llego una taza mas y el par de medias')
})

console.log(promesa)

// METODOS THEN Y CATCH

// manejar el resultado de la promesa
// Se usan de forma concatenada 
// concatenado quiere decir, uno tras de otro 

// THEN: se usa cuando la promesa se resuelve exitosamente 
// CATCH: cuando hay error o rechazo en la promesa
// FINALLY: Se ejecuta siempre, se resuelva o rechaze la promesa

promesa
    .then(()=> console.log('EXITO INFINITO'))
    .catch(()=> console.log('Sufrimiento mortal'))
    .finally(()=> console.log('Esto aparece siempre, re aburrido'))

// Ejemplo con productos
const productos = [
    {id:1 , nombre:'Mesa', precio:5000},
    {id:2 , nombre:'Silla', precio:1500},
    {id:3 , nombre:'Vino', precio:300},
]

// Creando una promesa que devuelva el producto por su ID 

function buscarProductoPorId(id){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            const producto = productos.find(producto => producto.id === id);

            if(producto){
                resolve(producto)
            }else{
                reject('No existe el producto, moriras rata de dos patas')
            }

        },2000)
    })
}

buscarProductoPorId(4)
    .then(producto => console.log(producto))
    .catch(error => console.error(error))

// ASYNC & AWAIT
// Palabras reservadas por el sistema

// El await es como la senalizacion de stop, tienes que detener todo y despues avanzas
// se genera una pausa en la generacion del codigo hasta que algo pase 

// function buscadoraProductoPorId(id){
//     const producto = buscarProductoPorId(id)
//     console.log(producto)
// }
// buscadoraProductoPorId(2)

// Lo volvemos entonces asincrono

// async function buscadoraProductoPorId(id){
//     const producto = await buscarProductoPorId(id)
//     console.log(producto)
// }
// buscadoraProductoPorId(2)

// Cuando trabajamos async await lo usamos con un try catch 

async function buscadoraProductoPorId(id){
    try {
        const producto = await buscarProductoPorId(id)
        console.log(producto)
    } catch (error) {
        console.log(error)
    }
}
buscadoraProductoPorId(30)

// aqui lo que sucede es que tienes un mejor control de las declaraciones 
// Ya que si algo falla puedes controlar mas de donde salio 

// Consulta a una API
// fetch('https://jsonplaceholder.typicode.com/users')
//     .then(respuesta=>respuesta.json())
//     // En el primero recibimos la resuesta 
//     .then(usuarios=>console.log(usuarios))
//     .catch(error => console.log('Hay un error', error))

// ejemplo con async await

async function obtenerUsuarios(){
    const respuesta = await fetch('https://jsonplaceholder.typicode.com/users')
    const usuarios = await respuesta.json();
    console.log(usuarios)
}

obtenerUsuarios()

// Buscar en youtube
// callbacks 
// Async await