const express = require("express")
const cors = require("cors")

const app = express()
const auth = require("./routers/auth")

app.use(express.json())

app.use(cors())

app.use(auth)

app.listen(4000,()=>{
      console.log("Server Started");
})