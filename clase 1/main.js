// Prinvipios basicos de javascript
console.log('Funciona');

// temas

// Plantillas
// Funciones
// scope 
// Closures 
// Clases y POO

// Funciones declarativas

function saludar () {
    console.log('holi')
}

saludar()

function elperro(edad,nombre){
    console.log('Mi perro '+nombre+' tiene '+edad+' years')
}

elperro(10,'chucho')

// funcion expresiva
// se ASIGNAN A VARIABLES 

let nuevosaludo = function(clase){
    console.log('El mejor curso del mundo es ' + clase)
}

nuevosaludo('backend')

// arrow function 
// Forma mas CORTA de redactar funciones EXPRESIVAS

let ultimoSaludo = () =>{
    console.log('adios')
}

ultimoSaludo()

// Forma AUN MAS RESUMIDA de una ARROW FUNCTION 
// SI YO LO HAGO EN UNA SOLA LINEA PUEDO QUITAR LAS LLAVES
// Si solo es UN PARAMETRO el que recibe, entonces se pueden 
// quitar los parentesis
const adiosito = curso => console.log('A mimir del curso de '+curso)

adiosito('react')

// Clases
class Persona{
    // se puede implementar una funcion construcora, se ejecuta 
    // cuando creamos un objeto de esta clase
    constructor(nombre,edad){
        this.nombre = nombre;
        this.edad = edad;
        // la palabra reservada this referencia el objeto creado
        // al crear un objeto a partir de una clase, se esta
        //Creando una instancia de esta clase 
    }
    // en si, el constructor CREA UN OBJETO
}

// se crea la instancia de persona

let coky = new Persona('Coky Argento',30)
console.log(coky)