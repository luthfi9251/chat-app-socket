const { Server } = require("socket.io")

const socketServer = (port) => {
    const io = new Server(port,{
        cors: {
            origin: "*",
            methods: ["GET","POST"]
        }
    })
    
    console.log("socket running on port " + port)

    io.on("connection", async (socket) => {
        console.log(`User Connected ${socket.id}`)
        socket.on("join room", data => {
            console.log(`Someone Joined room ${data}`)
            if(socket.currentRoom) socket.leave(socket.currentRoom)
            socket.join(data)
            socket.currentRoom = data
        })

        socket.on("message", (data) => {
            console.log(`Sending chat to ${data.roomActive}`)
            io.to(socket.currentRoom).emit("incoming", data)
        })

        socket.on('disconnect', ()=>{
            console.log("User Disconnect")
        })
    });
}

module.exports = {
    socketServer
}