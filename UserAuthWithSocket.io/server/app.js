const express = require("express")
const socketio = require("socket.io")
const http = require("http")
const bcrypt = require('bcrypt');
const saltRounds = 10;

const PORT = process.env.PORT || 4000

const auth = require("./routers/auth")

const app = express()


const server = http.createServer(app)

const io = socketio(server,{cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
}})

const db = [
      {id:"test123",name:"Test",pass:"$2b$10$Vwtp6DsdbvY6xeAoUiR2QO/0/hwYIutjJDrnK.000A05d6sOAXN1C",token:""},
]

//pass:123


io.on("connection",(socket)=>{

      console.log(socket.id)

      socket.on("login",data=>{

            const user = db.find((user) => user.name.toLowerCase() === data.name.toLowerCase());

            if(user){
                  bcrypt.compare(data.pass, user.pass, function(err, result) {
                        if (result) {

                              bcrypt.hash(user.id, saltRounds, function(err, hash) {
                                    socket.emit("login",{auth:true,token:hash})
                                    user.token = hash
                              })

                              

                        }
                        else {
                              socket.emit("login",{auth:false})
                        }
                  });
            }
            else{
                  socket.emit("login",{auth:false})
            }

            
      })

      socket.on("auth",token=>{
            const user = db.find((user) => user.token === token);

            if(user){
                  socket.emit("auth",{auth:true,name:user.name})
            }
            else{
                  socket.emit("auth",{auth:false})
            }

            
      })

})

app.use(auth)

server.listen(PORT,()=>{
      console.log("Server has started on port",PORT);
})




// io.on("connection",(socket)=>{

//       socket.on("join",({name,room},callback)=>{
//             const { error,user } = addUser({id:socket.id,name,room})

//             if(error) return callback(error)

//             socket.emit("message",{ user: "admin",text:`${user.name},welcome to the room ${user.room}`})
//             socket.broadcast.to(user.room).emit("message",{user:"admin",text:`${user.name}, has joined!`})

//             socket.join(user.room)

//             io.to(user.room).emit("roomData",{room:user.room,users:getUsersInRoom(user.room)})

//             callback()
//       })

//       socket.on("sendMessage",(message,callback)=>{
//             const user = getUser(socket.id)

//             io.to(user.room).emit("message",{user:user.name,text: message})
//             io.to(user.room).emit("roomData",{room:user.room,users:getUsersInRoom(user.room)})

//             callback()
//       })

//       socket.on("disconnect",()=>{
//             const user = removeUser(socket.id)

//             if(user){
//                   io.to(user.room).emit("message",{user:"admin",text:`${user.name} has left`})
//             }
//       })
// })


// io.on("connection",(socket)=>{

//       socket.on("join",(name)=>{
//             const existingUser = users.find((user) => user.name === name)

//             if(existingUser){
//                   socket.emit("join",false)
//             }
//             else{
//                   socket.emit("join",true)
//             }
//       })

//       socket.on("who",(data)=>{
//             users.push({name:data,id:socket.id})
//       })

      
//       io.sockets.emit("aaa",users)

//       socket.on("mesaj",(data)=>{
//             console.log(socket.id)
//             io.sockets.to(data.id).emit("privatee",data.mesaj)
//       })

//       // console.log(socket.id + " join")

//       // socket.on("sa",(item)=>{
//       //       console.log(item)
//       //       io.sockets.emit("sa",item)
//       // })

//       socket.on("disconnect",()=>{
//             const id = socket.id
//             const index = users.findIndex((user) => user.id === id);

//             if(index !== -1) return users.splice(index, 1)[0];
//       })
// })