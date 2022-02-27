import React, { useState } from 'react'
import { Card, Col, Row,  Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register } from '../actions/user_actions';
import  { Loading } from '../Components/LoadingComponent';    
import FromInput from '../UI/FormInput';
import Background from '../images/login_bg.jpeg';
import {useWindowDimensions} from '../shared/Dimensions';
import Layout from '../Components/Layout/Layout';
/**
* @author
* @function Register
**/

const Register = (props) => {
  const auth=useSelector(state=>state.auth);
  const user=useSelector(state=>state.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const dispatch = useDispatch();
  const {height, width}= useWindowDimensions();


  const handleRegister=(e)=>{
    e.preventDefault();
    const user ={
      firstName, lastName, username, email, password
    }
    dispatch(register(user));
  }

  if(auth.authenticate){
    return <Redirect to="/" />
  }
  if(user.registered){
    return <Redirect to="/login" />
  }
  if(user.loading){
    <Loading />
  }

 
  return(
   <Layout>
      <div style = {{  backgroundImage: `url(${ Background })`,
    backgroundSize: 'cover', position: 'fixed',margin:'0px', 
    width: `${width+10}px`, height:`${height}px`, zIndex:'-1' }}>
      <div className="card-center">
        <Card className="card"style={{ width: '25rem' }}>
          <Card.Header className="card-header" >Register</Card.Header>
          <Card.Body>
          <Form onSubmit={handleRegister}>
                <Row>
                  <Col md={6}>
                    <FromInput
                      placeholder="First Name"
                      value={firstName}
                      type="text"
                      onChange={(e)=>setFirstName(e.target.value)}
                    />
                  </Col>
                  <Col md={6}>
                    <FromInput
                      placeholder="Last Name"
                      value={lastName}
                      type="text"
                      onChange={(e)=>setLastName(e.target.value)}
                    />
                  </Col>
                </Row>
                <FromInput
                  placeholder="Username"
                  value={username}
                  type="username"
                  onChange={(e)=>setUserName(e.target.value)}
                />
                <FromInput
                  placeholder="Email"
                  value={email}
                  type="email"
                  onChange={(e)=>setEmail(e.target.value)}
                />

                <FromInput
                  placeholder="Password"
                  value={password}
                  type="password"
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <Button variant="primary" type="submit">
                  Submit
                </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
   </Layout>
   )

 }

export default Register