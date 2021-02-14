const graphql = require("graphql")
const _ = require("lodash")
const bcrypt = require("bcrypt")


const { 
      GraphQLObjectType,
      GraphQLString,
      GraphQLSchema,
      GraphQLID,
      GraphQLBoolean,
      GraphQLList
} = graphql;

var saltRounds = 10

const db = [
      {id:"test123",name:"Test",pass:"$2b$10$Vwtp6DsdbvY6xeAoUiR2QO/0/hwYIutjJDrnK.000A05d6sOAXN1C",token:""},
]

//pass:123


const UserType = new GraphQLObjectType({

      name: "User",
      fields: ()=>({
            id: {type: GraphQLString},
            name: {type: GraphQLString},
            pass: {type: GraphQLString},
            token: {type: GraphQLString}
      })

})

const AuthType = new GraphQLObjectType({

      name: "Auth",
      fields: ()=>({
            auth: {type:GraphQLBoolean},
            name: {type: GraphQLString}
      })

})


const TokenType = new GraphQLObjectType({

      name: "Token",
      fields: ()=>({
            auth: {type:GraphQLBoolean},
            token: {type: GraphQLString}
      })

})



const RootQuery = new GraphQLObjectType({
      name:"RootQueryType",
      fields:{
            user:{
                  type:UserType,
                  args:{
                        id:{type: GraphQLString}
                  },
                  resolve(parent,args){
                        const user = db.find((user) => user.id === String(args.id));

                        return user
 
                  }
            },
            users:{
                  type: GraphQLList(UserType),
                  resolve(parent,args){
                        return db
                  }
            }
      }

})

const Mutation = new GraphQLObjectType({
      name: "Mutation",
      fields:{
            addToken: {
                  type:TokenType,
                  args:{
                        name:{type: GraphQLString},
                        pass: {type: GraphQLString},
                  },
                  async resolve(parent,args){
                        const user = db.find((user) => user.name.toLowerCase() === String(args.name).toLowerCase());
                        var ret = {auth:false,token:""}
                        if(user){
                              await bcrypt.compare(String(args.pass),String(user.pass)).then(async (result)=>{
                                    if (result) {
                                          await bcrypt.hash(user.id, saltRounds).then((hash)=>{
                                                ret.auth = true
                                                ret.token = hash
                                                user.token = hash
                                          })
                  
                                          
                  
                                    }
                              });
                        }
                        return ret
                  }
            },
            userAuth:{
                  type:AuthType,
                  args:{
                        token:{type: GraphQLString}
                  },
                  resolve(parent,args){
                        const user = db.find((user) => user.token === String(args.token));

                        if(user){
                              return ({auth:true,name:user.name})
                        }
                        else{
                              return ({auth:false})
                        }
                        
                  }
            }
            }
})


module.exports = new GraphQLSchema({
      query:RootQuery,
      mutation:Mutation
})