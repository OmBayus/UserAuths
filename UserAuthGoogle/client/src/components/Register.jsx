import React,{useState} from "react"
import axios from "axios"
import { GoogleLogin } from 'react-google-login';
import {Redirect,Link} from "react-router-dom"


const Register = ()=>{
      const url = "http://localhost:4000/"
      const [error,setError] = useState("")
      const [isRegistered,setIsRegistered] = useState(false)

      const responseGoogle = (response) => {
            const data = response.profileObj
            if(!response.error){
              axios.post((url+"register"),data).then((res)=>{
                    if(res.data){
                          setError("Registration Successful")
                          setTimeout(()=>{setIsRegistered(true)},2000)
                    }
                    else{
                          setError("You have already registered")
                    }
              })
            }
            else{
              setError(response.error)
            }
      }

      return(
      <div style={{display:"flex",justifyContent:"center"}}>
            <div>
                  <h1>Register</h1>
                  {isRegistered && <Redirect to="/" />}
                  <h3>{error}</h3>
                  <GoogleLogin
                        clientId="5246791221-484c01mtkm7aifggkunikiniejfe29uc.apps.googleusercontent.com"
                        buttonText="Register"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                  />
                  <div>
                        <Link to="/">Login</Link>
                  </div>
            </div> 
    </div>)
}





export default Register