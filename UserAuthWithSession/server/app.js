const express = require("express")
const session = require("express-session")
const cors = require("cors")

const app = express()
const auth = require("./routers/auth")
app.use(session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false, maxAge:  6*60*60*1000},
      unset: 'destroy'
    }));

app.use(express.json())

app.use(cors({
      origin: 'http://localhost:3000',
      methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
      credentials: true
    }));

app.use(auth)

app.listen(4000,()=>{
      console.log("Server Started");
})