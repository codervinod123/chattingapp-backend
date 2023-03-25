const express=require("express");
const mongoose=require('mongoose');
const socket=require("socket.io");

const cors=require('cors');
const { route } = require("./routes/userRoutes");
const userRoutes = require("./routes/userRoutes");
const messageRoutes=require("./routes/messageRoutes");


//hide critical information for security purpose
//bsically process env hold critical information after when ew required the info
//we take it from th dotenv file that is saved with .env
require('dotenv').config();
// require("../server/db/db");
const app=express();


app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes);
app.use("/api/messages",messageRoutes);


require("./db/db");


const server=app.listen(process.env.PORT,()=>{
     console.log(`listening on the port number${process.env.PORT}`);
})


const io=socket(server,{
     cors:{
          origin:"http://localhost:3000/chat",
          credentials:true,
     },
});


global.onlineUser=new Map();
        

io.on("connection",(socket)=>{
     global.chatSocket=socket;
     socket.on("add-user",(userId)=>{
     onlineUsers.set(userId,socket.id);
   })

   socket.on("send-msg",(data)=>{
     console.log("sendmsg",{data});
     const sendUserSocket=onlineUser.get(data.to);
     if(sendUserSocket)
     {
          socket.to(sendUserSocket).emit("msg-recieve",data.messages);
     }
  });
});

