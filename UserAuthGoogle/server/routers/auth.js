const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = []


router.get("/",(req,res)=>{
      res.send("Server Up")
})


router.post("/register",(req,res)=>{
      const user ={
            googleId: req.body.googleId,
            email:req.body.email,
            name:req.body.givenName,
            imgUrl:req.body.imageUrl,
            token:""
      }
      const temp = db.find((item)=> item.googleId === user.googleId)
      if(!temp){
            db.push(user)
            res.json(true)
      }
      else{
            res.json(false)
      }
})

router.post("/token",(req,res)=>{

      const user = db.find((item)=> item.googleId === req.body.googleId)
      
      if(user){
            bcrypt.hash(user.googleId, saltRounds, function(err, hash) {
                  res.json({auth:true,token:hash})
                  user.imgUrl = req.body.imageUrl
                  user.token = hash
            })
      }
      else{
            res.json({auth:false})
      }
})

router.post("/auth",(req,res)=>{
      const user = db.find((item)=> item.token === req.body.token)

      if(user){
            res.json({...user,auth:true})
      }
      else{
            res.json({auth:false})
      }
})

module.exports = router