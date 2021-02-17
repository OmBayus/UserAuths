import React,{useState} from "react"
import axios from "axios"
import { GoogleLogin } from 'react-google-login';
import {Redirect,Link} from "react-router-dom"
import Cookies from 'js-cookie'


const Login = ()=>{

      const url = "http://localhost:4000/"

      const [error,setError] = useState("")
      const [isAuth,setIsAuth] = useState(false)

      const responseGoogle = (response) => {
            const data = response.profileObj
            if(!response.error){
              axios.post((url+"token"),data).then((res)=>{
                    if(res.data.auth){
                        setError("Successful")
                        setTimeout(()=>{setIsAuth(true)},2000)
                        Cookies.set("token",res.data.token, { expires: 1/24/60/2 })
                    }
                    else{
                          setError("User not found")
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
                  <h1>Login</h1>
                  {isAuth && <Redirect to="/main" />}
                  <h3>{error}</h3>
                  <GoogleLogin
                        clientId="5246791221-484c01mtkm7aifggkunikiniejfe29uc.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                  />
                  <div>
                        <Link to="/register">Register</Link>
                  </div>
            </div> 
    </div>)
}





export default Login