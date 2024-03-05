document.addEventListener('DOMContentLoaded', function () {
const btn=document.getElementById('btn');
var msg=document.getElementById('msg');
var inp=document.getElementById('inp');
var name=document.getElementById("inpName");
const subBtn=document.getElementById("submit");
var clientName="";
const ws = new WebSocket("wss://chat-application-m4xb.onrender.com");

inp.disabled=true;
btn.disabled=true;

subBtn.addEventListener('click',()=>{
    clientName=name.value;
    name.disabled=true;
    subBtn.disabled=true;
    ws.send(clientName+" joined the chat.")
    if(clientName!=="")
    {
        inp.disabled=false;
        btn.disabled=false;
    }
    else if(clientName==="")
    {
        alert("Enter your name first.")
        name.disabled=false;
        subBtn.disabled=false;
    }
})

ws.addEventListener("open",(ws)=>{
    console.log("Connected to the server.")
 })

btn.addEventListener('click',()=>{
    msg.innerHTML=msg.innerHTML+"You : "+inp.value+"<br>";
    ws.send(clientName+" : "+inp.value);
    inp.value="";
})

ws.addEventListener("message",(event)=>{
    console.log(event.data)
    // msg.innerHTML+=event.data+"<br>";   
    //arryBuffer is used to convert blob object to text form 
    //because event.data is blob type object
    event.data.arrayBuffer().then(buffer => {
    const text = new TextDecoder('utf-8').decode(buffer);
    msg.innerHTML = msg.innerHTML + text + "<br>";
    });
});

ws.addEventListener("close",(event)=>{
    
    msg.innerHTML+="Connection closed <br>";
})      
});

