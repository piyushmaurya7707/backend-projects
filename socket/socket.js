const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io'); 


const app = express();
const server = http.createServer(app);
const io = new Server(server);



  io.on('connect',(socket)=>{

    console.log("connected");

    
    socket.on('message',(msg)=>{

            io.emit('message',{
                text: msg,
                id: socket.id
            });
    });

  });

  app.use(express.static(path.join(__dirname,'public')));

  app.get('/',(req,res)=>{
    return res.sendFile(path.join(__dirname,'index.html'));
  });

  server.listen(2856, ()=>console.log('server is started'));