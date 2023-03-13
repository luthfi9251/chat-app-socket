const express = require('express')
const app = express()
const {createServer} = require('http')
const {socketServer} = require('./socket')

const httpServer = createServer(app)
const PORT = 8000

socketServer(PORT)

// httpServer.listen(PORT,()=>{
//     console.log("Socket Listening on port: " + PORT)
// })