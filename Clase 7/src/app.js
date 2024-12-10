// clase 7 Express avanzado

// 1.- codigos de estado
// 2.- que es una API
// 3.-Arquitectura API REST
// 4.-Metodos de la peticion
// 5.- POSTMAN
// 6.- Practicamos get post put delete

// 1.- codigos de estado

// Cada que se hace una peticion, a parte de informacion, puede dar el estado de la peticion, por medio de los numeros de 3 cifras como el 404
// dividido en 5 clases

/*  
    1xx: Respuestas INFORMATIVAS, el server recibio la solicitud y continua con el proceso
    2xx: Respuesta EXITOSA, la peticion  fue recibida, entendida y aceptada exitosamente
    3xx: REDIRECCION, el cliente necesita acciones adicionales para completar la solicitud
    4xx: ERROR del CLIENTE, error por parte del cliente al realizar la peticion 
    5xx: ERORR del SERVIDOR 
    */

/*  
    MAS USADOS
    200: ok 
    400: Bad Request, solicitud no puede ser entendida por el server 
    401: NO autorizado
    403: forbidden, las credenciales no tienen autorizacion para ese contenido 
    404: not found, recurso no encontrado 
    500: internal server error 
    */

/* 
    API 
    Biblioteca de informacion 
    Es aquella que nos trae la informacion 
    acronimo de APLICATION PROGRAMMING INTERFACE
    conjunto de reglas que permite que dos equipos puedan integrarse y trabajar juntos 

    */

    /* 
    REST 
    Hace referencia a la  estructura de los datos
    los formatos son XML Y JSON
    Todo depende de las necesidades del proyecto 
    */

    /*Caracteristicas que deben tener 
    Cada mensaje HTTP contiene la info necesaria para la peticion 
    debe ser cacheable 
    GET,POST,PUT,DELETE
    CRUD
    */


// 4.-Metodos de la peticion


// Levantando el server
import express from "express"
const app = express() 
const PUERTO = 8080

// middleware
// Es el cadenero, dice quien pasa o no 
app.use(express.json())
// se declara al server que se va a trabajar con JSON
app.use(express.urlencoded({extended: true}))
// nos permite gestinar multiples datos desde el cliente

// rutas
app.get("/",(req,res)=>{
    res.send('Hola amiguito!')
})
// armando el sistema de gestion de clientes
const clientes = [
    {id:"1", nombre:"Lionel", apellido:"Messi"},
    {id:"2", nombre:"Cristiano", apellido:"Ronaldo"},
    {id:"3", nombre:"Eber", apellido:"Ludue;a"}
]

// ruta que trae los clientes 

app.get("/clientes",(req,res)=>{
    res.send(clientes)
})

// creando una ruta para el id 
app.get("/clientes/:id",(req,res)=>{
    const id = req.params.id
    const idEncontrado = clientes.find((cliente)=>cliente.id == id)
    // if(idEncontrado != undefined){
    //     res.send(idEncontrado)
    // }else{
    //     console.error('El id  no existe')
    // }
    // otra forma de validar que es la de profe funsiona asi 
    if(idEncontrado){
        return res.send(idEncontrado)
    }else{
        return res.send('moriras')
    }
})

// haciendo un post   para almacenar nuevo cliente
app.post('/clientes',(req,res)=>{
    const nuevoCliente = req.body;
    clientes.push(nuevoCliente)
    console.log(clientes)
    res.send("cliente creado")
})

// listen
app.listen(PUERTO,()=>{
    console.log(`escuchando en el puerto ${PUERTO}`)
})