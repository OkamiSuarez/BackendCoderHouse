// clase 6 servidores web
// Temas
            // Server 
// Todo puede estar almacenado por un server 
// los clientes piden data al server 
// Server: Software o HW que administra recursos web como
//  imagenes, archivos,sitios web, videos, juegos, datos
// Su funcion es responder a las peticiones del cliente
// Puede responder a multiples peticiones de clientes al mismo tiempo
//esa relacion es el modelo cliente-servidor 

// CLIENTE HACE PEDIDO = REQUEST
// SERVER RESPONDE = RESPONSE

// Nuestro PROTOCOLO es el HTTP 
// Bajo este protocolo se comunica el cliente con el server

// vamos a instalar nodemon
// npm install -g nodemon 
// npm install nodemon -D en este caso para usarla en desarrollo
// en el package dentro de los scripts agregamos el 
// "dev": "nodemon src/app.js"
// o en su defecto 
// "dev": "node --watch src/app.js"


            // modulo nativo http 
// PRIMER SERVIDOR
// 1  Importar el modulo HTTP, ya viene con node por lo que solo hay que requerirlo
const http = require('http');
// si yo quisiera hacerlo por ES Modules: import http from 'http'

// creando el server 
// para eso vamos a usar el metodo createServer
// Este metodo recibe como param una funcion callback que es ejecutada 
// Cada vez que se realice la peticion al servidor 
// parametros: request y response
const server = http.createServer((request,response)=>{
    console.log('Se realizo una peticion al server')
    // response.end('mi primer servidor que felicidad')
    response.end('hola mundo')
    
})
// tercer paso, poner el server a escuchar
// en un puerto de la computadora
// son ubicaciones especiales del SO donde se puede ejecutar una app determinada
// el mas comun al desarrollar una app es el 8080
const PUERTO = 8080

// para ponerlo a escuchar entonces
        // server.listen(PUERTO,()=>{
        //     // console.log('escuchando el  puerto 8080')
        //     console.log(`escuchando el  puerto ${PUERTO}`)
            
        // })
            // express js 
// Arquitectura mas prolija
// uso de middlewares
// usar rutas para peticiones 
// 1 Instalar express con 
//      npm i express
// 2 importar modulo
const express = require('express')
// con ES MODULES ES 
// import express from 'express'

// 3 crear app de express
const app = express()

// crear rutas para la app 

// Ruta saludo con los
// get post  put delete

app.get('/saludo',(req,res)=>{
    res.send('hola, bienvenido al mundo de express')
})
// Entramos aqui mediante http://localhost:8080/saludo

app.get('/productos',(req,res)=>{
    res.send('productos')
})

app.get('/contactos',(req,res)=>{
    res.send('contactos')
})

// creamos nuestra ruta de usuarios
const arrayUsuarios = [
    {id:1,nombre:'TinkiWinki', apellido:'Teletubbie'},
    {id:2,nombre:'Lala', apellido:'Teletubbie'},
    {id:3,nombre:'Po', apellido:'Teletubbie'},
    {id:4,nombre:'Dipsi', apellido:'Teletubbie'},
    {id:5,nombre:'Sol', apellido:'Teletubbie'}
]

app.get('/usuarios',(req,res)=>{
    res.send(arrayUsuarios)
})
// req y res son OBJETOS que representan los pedidos
// ahora se captura con  un dato dinamico la respuesta de la pantalla
// se va a  retornar un usuario por su ID 

// req.params : aca se guardan TODOS los parametros que se envian

app.get('/usuarios/:id',(req,res)=>{
    // primero capturamos el ID que viene de la url
    // LO QUE YO PONGA COMO ID TAMBIEN TIENE QUE ESTAR IGUAL EN EL PARAMS
// Esto es por que el dos puntos se le va a pasar al params

    let id = req.params.id

    // otra forma de hacerlo es 
    // let {id} = req.params

    // TODO LO QUE CAPTURAMOS EN PARAM TIENE FORMATO STRING
    // debido a esto, no se puede usar el estrictamente igual en el find
    console.log('id')
    console.log(id)
    console.log(typeof id)
    // segundo buscamos el array el user que coincide
    let usuarioBuscado = arrayUsuarios.find(teletubbie  => teletubbie.id == id)
    // tercero, si lo encuentro lo retorno
    if(usuarioBuscado){
        res.send(usuarioBuscado)
    }else{
        res.send('el usuario solicitado no existe')
    }
})

// tambien tiene que tener un listener
app.listen(PUERTO, ()=>{
    // console.log('Escuchando el puerto 8080')
    console.log(`escuchando el  puerto ${PUERTO}`)

})



            // objeto request 

// normalmente en la url se puede querer mandar mas que un dato 
// req.query permite hacer multiples consultas que se pueden hacer a un endpoint 
// se crea una ruta para guardar nombre y apellido

app.get('/clientes',(req,res)=>{
    // let nombreCliente = req.query.nombre
    // let apellidoCliente = req.query.apellido
    // res.send(`bienvenido ${nombreCliente} ${apellidoCliente}`)
    
    let {nombre,apellido} =req.query
    res.send(`bienvenido ${nombre} ${apellido}`)
    // http://localhost:8080/clientes?nombre=Samuel&apellido=Gmz
})

            // presentacion del ejercicio del after de manana 


