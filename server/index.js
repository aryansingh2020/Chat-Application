const WebSocket= require ("ws");
const wss=new WebSocket.Server( {port:3002});


wss.on("connection",(ws)=>{
    console.log("New client connected.");

ws.on("message",(data)=>{
    // console.log(`Client sent us the message.${data}`)
    wss.clients.forEach((client) => {
        //condition to check whether the same message is not sent to the current client and is sent only to other clients.
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            console.log(`Client sent us the message.${data}`)
            client.send(data);
        }
    });
    // ws.send("Server: "+data);
})

ws.on("close",()=>{
    console.log("Closed")
    });
}) 