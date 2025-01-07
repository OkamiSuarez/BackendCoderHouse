// alert('si funciona')

// se genera una instancia de socket.io desde el lado del cliente
const socket = io()

// cuando se quiere abrir la conexion y emitir un mensaje al server se puede hacer lo siguiente 
// metodo emit emite 
// metodo on escucha
socket.emit("mensaje","escribiendo desde el front")

// se escucha el mensaje del backend
socket.on("saludito",(data)=>{
    console.log(data)
})

socket.on("usuarios",(data)=>{
    // console.log(data)
    const listaUsuarios = document.getElementById("lista-usuarios")

    listaUsuarios.innerHTML = "";

    data.forEach(usuario =>{
        listaUsuarios.innerHTML += `<li> ${usuario.nombre} - ${usuario.apellido}`
    })
})