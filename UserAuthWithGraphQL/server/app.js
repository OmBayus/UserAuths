const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const cors = require("cors")
const schema = require("./schema/schema")

const app = express()

app.use(cors())

app.use("/graphql",graphqlHTTP({
      schema,
      graphiql:true // You need to this for testing
}))

app.listen(4000,()=>{
      console.log("Server Started")  
})