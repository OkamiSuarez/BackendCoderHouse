// console.log('funciona')
// se seleccionan elementos del dom

const sendMessageButton = document.getElementById("sendMessage")
const numberInput = document.getElementById('number')
const messageInput = document.getElementById('message')
const statusDiv = document.getElementById('status')

// listeners
sendMessageButton.addEventListener("click", async ()=>{
    const number = numberInput.value.trim();
    const message = messageInput.value.trim();

    if(!number || !message){
        statusDiv.textContent = "Porfavor completar todos los campos"
        statusDiv.style.color = 'red'
        return
    }
})