// import { Alert } from 'bootstrap';
import React, {useRef, useState} from 'react'
import {Card,Form,Button,Alert} from "react-bootstrap";
import {useAuth} from '../../Contexts/authcontext';
import CenteredContainer  from './centeredContainer';

import {Link, useHistory} from 'react-router-dom'

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const {login } = useAuth();
    const [error,setError] =useState();
    const [loading,setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit  = async (e)=>{
        e.preventDefault();
            try{
                // setError('');
                setLoading(true);
                await login(emailRef.current.value,passwordRef.current.value);
                setLoading(false);
                history.push('/');  
            }
            catch{
                setError("Your Email or Password is wrong");
            }
    }
    return (
        <CenteredContainer>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Log In</h2>
                {error && <Alert variant="danger" >{error}</Alert>}
                  <Form onSubmit={handleSubmit}>
                     <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required/>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required/>
                    </Form.Group>

                    <Button disabled={loading} type="submit" className="w-100 my-4">Log In</Button>
                </Form> 
                <div className="text-center">
                    <Link to="/reset-password">Forgot Password?</Link>    
                </div>   
            </Card.Body>
        </Card>
        <div className="text-center">
            Don't have an Account?<Link to="/signup">Sign up</Link>
        </div>
        </CenteredContainer>
    )
}
