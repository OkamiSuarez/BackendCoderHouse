// Clase 4 Node y NPM

// temas

// 1 Node
//  2 Modulos nativos y de terceros
//  NPM
// Inicializamos un proyecto con NPM  
//  Instalaciones globales y locales
//  Versionado de dependencias
// Politicas a la hora de actualizar dependencias

// Conceptos importantes:
// MODULOS
// Archivo de Js con un conjunto de funciones que nos permiten resolver una tarea en particular

// por ejemplo podemos tener modulos 
// A)escritos por nosotros
// Para trabajar con modulos hay 2 formas
// Common JS y ES modules

// importacion con common js

// const saludos = require('./saludos.js')

// saludos.temprano()
// saludos.tarde()
// saludos.noche()

// Creando un paquete de NPM para usar ES modules
// npm init
// npm init --yes
// se agerega dentro del package json el type a modules 
// "type": "module"

import { temprano,tarde,noche } from "./saludos.js";
temprano()
tarde()
noche()

// Modulos nativos de NODEjs
// Son modulos que permiten hacer ciertas cosas con node js, por ejemplo crear archivos, crear https, crear bases, etcetera
// Los nativos son aquellos que bienen por defecto con NODE y ya tienen funciones que nos permiten 
// resolver algo en particular, por ejemplo 
// fs: trabajar con archivos como txt y json
// http: crear un server
// path: crear rutas de archivo
// crypto: encriptar datos
// timers: trabajar con lo asincrono
// console: mostrar mensajes en consola 

// modulos de terceros
// lo primero que podemos hacer es buscarlos en la pagina de npm 
// se instalara uno 

// escribir npm install *nombre del modulo que queremos buscar*
// npm install express
// npm i mongoose
// Cualquiera de las dos anteriores esta bien
// eso se va a ir a package json en dependencias
    // "dependencies": {
    //     "express": "^4.21.1",
    //     "mongoose": "^8.8.3"
    //   }

// Dependencia: paquete o modulo externo que el proyecto necesita 
// para funcionar correctamente 

// paquete: conjunto de modulos que resuelven una tarea en particular 

// Dependencias de desarrolllo: acompa;an en la etapa de ELABORACION del codigo 
// ej. nodemon
//  npm i nodemon -D
// Esto indica que es una dependencia de desarrollo y se ve asi en el package
    // "devDependencies": {
    //     "nodemon": "^3.1.7"
    //   }

// tambien podemos CREAR shortcuts en el package json en la seccion de scripts, lo que hacemos es 
// generar texto reusable con un nombre clave que vamos a tirar por terminal 
    // "start": "node main.js"
// y esto se pone en la terminal como 
// npm start
    // "dev": "nodemon main.js"
// npm dev me dara un error por ser script entonces usamos
// npm run dev

console.log('amonos')

// tambien podemos usar node -- watch

// INSTALACIONES GLOBALES Y LOCALES 
// instalar sass global 
// npm i sass -g

// Ver todo lo instalado global en caso de perder el registro de las versiones
// npm list -g

// desinstalar dependencias
//  npm uninstall express
//  npm uninstall mongoose
// o de forma mas practica
//  npm install express mongoose
// 
// POLITICA DE ACTUALIZACION Y DEPENDENCIAS
// 
// 
// 
// 
// 
// 