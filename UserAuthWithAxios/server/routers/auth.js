const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = [
      {id:"test123",name:"Test",pass:"$2b$10$Vwtp6DsdbvY6xeAoUiR2QO/0/hwYIutjJDrnK.000A05d6sOAXN1C",token:""},
]

//pass:123

router.get("/",(req,res)=>{
      res.send("Server Up")
})


router.post("/token",(req,res)=>{
      const user = db.find((user) => user.name.toLowerCase() === req.body.name.toLowerCase());

      if(user){
            bcrypt.compare(req.body.pass, user.pass, function(err, result) {
                  if (result) {

                        bcrypt.hash(user.id, saltRounds, function(err, hash) {
                              res.json({auth:true,token:hash})
                              user.token = hash
                        })

                        

                  }
                  else {
                        res.json({auth:false})
                  }
            });
      }
      else{
            res.json({auth:false})
      }
})

router.post("/auth",(req,res)=>{
      const user = db.find((user) => user.token === req.body.token);

      if(user){
            res.json({auth:true,name:user.name})
      }
      else{
            res.json({auth:false})
      }
})

module.exports = router