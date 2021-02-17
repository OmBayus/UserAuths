import React,{useState,useEffect} from "react"
import {Button} from "react-bootstrap"
import axios from "axios"
import {Redirect} from "react-router-dom"
import Cookies from 'js-cookie'


const Main = ()=>{
      const url = "http://localhost:4000/"

      const [user,setUser] = useState({id:"",name:"",email:"",img:""})

      const [isAuth,setAuth] = useState(false)

      useEffect(()=>{
            let token = Cookies.get("token")

            axios.post((url+"auth"),{token:token}).then(
                  res =>{
                        if(res.data.auth){
                              setUser(
                                    {
                                          id:res.data.googleId,
                                          name:res.data.name,
                                          email:res.data.email,
                                          img:res.data.imgUrl
                                    }
                              )
                        }
                        else{
                              setAuth(true)
                        }
                  }
             )
            
      },[])

      const Logout = ()=>{
            Cookies.remove('token')
            setAuth(true)
      }
      return(
      <div style={{display:"flex",justifyContent:"center"}}>
            {isAuth && <Redirect to="/" />}
            <div>
                  <div style={{display:"flex",justifyContent:"center"}}>
                        <img src={user.img} alt="resim" style={{borderRadius:"50px"}}/>
                  </div>
                  <h1>Hello {user.name}</h1>
                  <p>Your id: {user.id}</p>
                  <p>Email: {user.email}</p>
                  <Button onClick={Logout}>Logout</Button>
            </div> 
      </div>)
}






export default Main