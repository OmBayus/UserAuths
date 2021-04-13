const express = require("express")
const router = express.Router()

const db = [
      {id:"test123",name:"Test",pass:"$2b$10$Vwtp6DsdbvY6xeAoUiR2QO/0/hwYIutjJDrnK.000A05d6sOAXN1C"},
]

//pass:123

router.get("/",(req,res)=>{
      res.send("Server Up")
})


router.post("/token",(req,res)=>{
      const user = db.find((user) => user.name.toLowerCase() === req.body.name.toLowerCase());
      if(user){
            req.session.userid = user.id
            req.session.name = user.name
            req.session.pass = user.pass
            res.json({auth:true})
      }
      else{
            res.json({auth:false})
      }
})

router.post("/auth",(req,res)=>{

      if(req.session.name){
            res.json({auth:true,name:String(req.session.name)})
      }
      else{
            res.json({auth:false})
      }
})

router.post("/deltoken",(req,res)=>{
      req.session.userid = null
      req.session.name = null
      req.session.pass = null
      res.json(true)
})

module.exports = router