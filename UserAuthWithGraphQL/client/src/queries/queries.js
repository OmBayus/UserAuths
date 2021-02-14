import {gql} from "@apollo/client"

const AuthQuery = gql`
  mutation($token: String!){
      userAuth(token: $token){
            name
            auth

      }
}
`;

const TokenMutation = gql`

      mutation($name:String!,$pass:String!){
            addToken(name:$name,pass:$pass){
                  auth
                  token

            }
      }

`


export {AuthQuery,TokenMutation}