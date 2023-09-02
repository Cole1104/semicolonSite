const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const ioS = new Server(server,{
  cors:{
    //origin:"http://192.168.0.10:3000"
    origin:"https://semicolon-site.vercel.app"
  }
});
let userList = [];
ioS.on('connection',(user)=>{
    user.join('matching...')
    userList.push(user.id);
    if(userList.length == 2){
      const madeRoomId = userList.join("");
      userList = [];
      ioS.in('matching...').socketsJoin(madeRoomId);
      ioS.in('matching...').socketsLeave('matching...');
      ioS.in(madeRoomId).emit('matched!',madeRoomId);
    }
    user.on('disconnect',()=>{
        userList.filter(element => element !==user.id);
    })
    user.on('message',(value,roomId,name)=>{
      
      if(roomId == undefined){
        console.log(roomId);
        return;
      }
      user.in(roomId).emit('messaged',value,name);
    })
})
ioS.of("/").adapter.on("leave-room", (room, id) => {
  if(room.length == 40){
    console.log(room);
    ioS.in(room).emit('byebye')
  }
});
app.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(3001, () => {
  console.log(`Example app listening on port 3001`)
})