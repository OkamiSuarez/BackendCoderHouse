// Clase 5 Manejo de archivos

// Temas: 

// 1.- File System


// File System o FS, manejador de archivos incorportado con NodeJs
// Realizar CRUD

// Se usa la importacion common JS

        // 1.- Importar modulo con common JS
const fs = require('fs');
const { parse } = require('path');

// console.log(fs)

        //  2.- Manejo de archivos sincronico

const ruta = './ejemploa.txt'

// crear archivo
fs.writeFileSync(ruta, 'hola, estamos trabajando en un ejemplo sincronico')
// TODO LO QUE USE TIENE QUE TERMINAR CON SYNC
// ahora para leerlo
    // let contenido = fs.readFileSync(ruta, 'utf-8')   
// Primer param fue la ruta y segundo la codificacion
    // console.log(contenido)

// ejemplo de como se ve mal
    // let contenidoMalo = fs.readFileSync('./coderDato', 'utf-8')
    // console.log(contenidoMalo)

//Verificamos que el archivo existe antes de leerlo
    // if(fs.existsSync('./coderFalso.txt')){
    //     let contenidoMalo = fs.readFileSync('./coderDato', 'utf-8')
    //     console.log(contenidoMalo)
    // } else {
    //     console.log('el archivo no existe')
    // }
// Ejemplo de si funciona

    // if(fs.existsSync(ruta)){
    //     let contenidoMalo = fs.readFileSync(ruta, 'utf-8')
    //     console.log(contenidoMalo)
    // } else {
    //     console.log('el archivo no existe')
    // }


    // Actualizar contenido
// se puede hacer appen o pisar la info 
fs.writeFileSync(ruta,'sobreescribiendo una info sincronica')

// agregar contenido al final 
fs.appendFileSync(ruta,' y Este es un texto agregado al final')
// Append permite agregar mas contenido al final
// si no encuentra el archivo en esa ruta lo va a crear

    // Eliminar un archivo COMPLETO
fs.unlinkSync(ruta)

    // 3.- Manejo de archivos con Callback
// en este caso se pasa como argumento la funcion 

const ruta2 = './ejemplob.txt'
// aqui le quitamos la opcion del sync por que ya no es sincronico
// Creamos el archivo
fs.writeFile(ruta2,'Nuevo archivo de callback',(error)=>{
// El tercer parametro es el callback preguntando si hay error
    if(error) return console.log('no se pudo crear el archivo')

    //leemos el archivo 
    fs.readFile(ruta2,'utf-8',(error,contenido)=>{
        if(error) return console.log('no se puede leer el codigo, algo esta mal')
                // console.log(contenido)
        // aqui son dos parametros, el error y  el contenido del archivo
        // si queremos agregar mas info 
        fs.appendFile(ruta2,' Se le suma mas contenido',(error)=>{
            if(error) return console.log('no se puede agregar mas contenido')

                // En caso de querer eliminar
                fs.unlink(ruta2,(error)=>{
                    if (error) return console.log('No se puede eliminar')
                })
        })
    })
})

        // 4.- Manejo de archivos con promesas
// Para trabajar con  promesas se tiene que usar la propiedad promises del modulo fs
const  ruta3 = './ejemplo3.txt'

const operacionesAsincronicas = async () =>{

    // crear un archivo
    await fs.promises.writeFile(ruta3,'nuevo archivo de promesas')

    // leer archivo
    let respuesta = await fs.promises.readFile(ruta3,'utf-8')
    console.log(respuesta)

    // agregar contenido adicional 
    await fs.promises.appendFile(ruta3,' Segunda prueba de agregado')

    // releer
    respuesta = await fs.promises.readFile(ruta3,'utf-8')
    console.log(respuesta)

    // eliminando
    await fs.promises.unlink(ruta3)
}
// no olvidar invocar la funcion
operacionesAsincronicas()

        // 5.- Manejo de datos complejos
// array de personas
const arrayPersonas = [
    {nombre:'oka', apellido:'Argento', edad:27},
    {nombre:'koko', apellido:'Argento', edad:20},
    {nombre:'mocha', apellido:'Argento', edad:30},
    {nombre:'paps', apellido:'Argento', edad:25},
    {nombre:'caste', apellido:'Argento', edad:20}
]

// console.log(arrayPersonas)
const archivoArgento = './archivo-argento.json'

// guardar la info 
const documentoArgento = async () =>{
    await fs.promises.writeFile(archivoArgento, JSON.stringify(arrayPersonas,null,2))

    // let respuestaNueva = await fs.promises.readFile(archivoArgento,'utf-8')
    // console.log(respuestaNueva);
}
documentoArgento()

// leyendo los datos

const leerDatos = async () =>{
    let respuesta = await fs.promises.readFile(archivoArgento,'utf-8')
    // primero cre la variable yluego la parseo
    const arrayNuevo = JSON.parse(respuesta)
    console.log(arrayNuevo);
}
leerDatos()