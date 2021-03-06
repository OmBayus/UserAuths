import React,{useEffect,useState} from 'react';
import {Container,Row,Col,CardGroup,Card,Button} from "react-bootstrap"
import Cookies from 'js-cookie'
import {Redirect} from "react-router-dom"

import {socket} from "./socket"

export default function Main() {

      const [isAuth,setAuth] = useState(false)
      const [name,setName] = useState("")

      useEffect(()=>{
            let token = Cookies.get("token")

            socket.emit("auth",token)
            
      },[])

      useEffect(()=>{
            socket.on("auth",(info)=>{
                  if(info.auth){
                        setName(info.name)
                  }
                  else{
                        setAuth(true)
                  }
            })
      },[])

      const Logout = ()=>{
            Cookies.remove('token')
            setAuth(true)
      }

      return (
      <div className="login" id="full-height">
            {isAuth && <Redirect to="/" />}
            <Container>
            <Row className="justify-content-center">
            <Col md="1" className="p-2 cikolata-kenar"></Col>
            <Col md="10" className="p-0">
                  <CardGroup>
                  <Card className="p-4 login-left">
                  <Card.Body>
                              <h1 className="text-white" >Main</h1>
                              <p className="text-muted">This is Main page</p>
                  </Card.Body>
                  </Card>
                  <Card className="text-white py-5 login-right" id="log-reg" style={{width:"44%"}}>
                  <Card.Body className="text-center">
                        <div>
                        <h2>{name.toUpperCase()}</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <Button onClick={Logout} variant="outline-light" size="lg"className="mt-3">Logout</Button>
                        </div>
                  </Card.Body>
                  </Card>
                  </CardGroup>
            </Col>
            </Row>
            </Container>
      </div>
      )
}