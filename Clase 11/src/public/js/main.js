// alert('funciona')

const socket = io()

// se guarda el nombre del user
let user;

const chatBox = document.getElementById('chatBox')


// socket.emit("saludo","hola server")

// se empieza a usar sweet alert
// Swal.fire("esto es un alert")

Swal.fire({
    title:"Identificate",
    input:"text",
    text:"Ingresa un usuario de identificacion",
    inputValidator: (value) =>{
        return !value && "Necesitas escribir un nombre para continuar"
    },
    allowOutsideClick: false
}).then(result =>{
    user = result.value
    // aqui se guarda el nombre del user 
    console.log(user)
})

// se hace un escuchador de eventos 
chatBox.addEventListener("keyup",(event)=>{
    if(event.key === "Enter"){
        if(chatBox.value.trim().length > 0){
            // Si el mensaje tiene mas de 0 caracteres se envia al server
            socket.emit("message",{user: user,message: chatBox.value})
            chatBox.value = ""
        }
    }
})

// messagesLogs

// Listener de mensajes
socket.on("messagesLogs", data => {
    const log = document.getElementById("messagesLogs")
    let mensajes = "";
    data.forEach(mensaje=>{
        mensajes = mensajes + `${mensaje.user} dice: ${mensaje.message} <br>`
    })
    log.innerHTML = mensajes
})