import React,{useEffect,useState} from 'react';
import {Container,Row,Col,CardGroup,Card,Button} from "react-bootstrap"
import {Redirect} from "react-router-dom"

import axios from "axios"

export default function Main() {

      const url = "http://localhost:4000/"

      const [isAuth,setAuth] = useState(false)
      const [name,setName] = useState("Cevap Bekleniyor")

      useEffect(()=>{

            axios.post((url+"auth"),{data:"data"}, {
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  withCredentials: true
                }).then(
                  res =>{
                        if(res.data.auth){
                              setName(res.data.name)
                        }
                        else{
                              setAuth(true)
                        }
                  }
            )
            .catch(err=>{
                  setName("Serverdan Cevap Alınamıyor.")
                  setTimeout(()=>{
                        window.location.replace("/")
                  },10000)
            })
            
      },[])

      const Logout = ()=>{
            axios.post((url+"deltoken"),{data:"data"}, {
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  withCredentials: true
                }).then(
                  res =>{
                        setAuth(true)
                  }
            )
      }

      if(name === "Cevap Bekleniyor" || name === "Serverdan Cevap Alınamıyor."){
            return(
            <div>
            {isAuth && <Redirect to="/" />}
            <h1>{name}</h1>
            </div>)
      }
      else{
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
                              <h2>{name}</h2>
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
}