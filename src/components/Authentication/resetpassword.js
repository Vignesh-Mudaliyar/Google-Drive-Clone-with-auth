// import { Alert } from 'bootstrap';
import React, {useRef, useState} from 'react'
import {Card,Form,Button,Alert} from "react-bootstrap";
import {useAuth} from '../../Contexts/authcontext';
import CenteredContainer  from './centeredContainer';
import {Link, useHistory} from 'react-router-dom'

export default function Login() {
    const emailRef = useRef();
    const {resetpassword } = useAuth();
    const [error,setError] =useState();
    const [message,setMessage] =useState();
    const [loading,setLoading] = useState(false);

    const handleSubmit  = async (e)=>{
        e.preventDefault();
            try{
                setMessage("");
                setError("");
                setLoading(true);
                await resetpassword(emailRef.current.value);
                setMessage("Please check your inbox");
            }
            catch{
                setError(" Failed to Reset password");
            }
            setLoading(false);
    }
    return (
        <CenteredContainer>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Reset Password</h2>
                {error && <Alert variant="danger" >{error}</Alert>}
                {message && <Alert variant="success" >{message}</Alert>}
                  <Form onSubmit={handleSubmit}>
                     <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required/>
                    </Form.Group>

                     <Button disabled={loading} type="submit" className="w-100 my-4">Reset password</Button>
                </Form> 
                <div className="text-center">
                    <Link to="/login">Login</Link>    
                </div>   
            </Card.Body>
        </Card>
        <div className="text-center">
            Don't have an Account?<Link to="/signup">Sign up</Link>
        </div>
        </CenteredContainer>
    )
}
