// import { Alert } from 'bootstrap';
import {React, useRef, useState} from 'react'
import {Card,Form,Button,Alert} from "react-bootstrap";
import {useAuth} from '../../Contexts/authcontext';
import {Link, useHistory} from 'react-router-dom';
import CenteredContainer  from './centeredContainer';


export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmpasswordRef = useRef();
    const {signup } = useAuth();
    const [error,setError] =useState();
    const [loading,setLoading] = useState(false);
    const history = useHistory();
    const handleSubmit  = async (e)=>{
        e.preventDefault();
            if(passwordRef.current.value !== confirmpasswordRef.current.value)
            {
                return setError("Password do not match");
            }

            try{
                setError('');
                setLoading(true);
                await signup(emailRef.current.value,passwordRef.current.value);
                setLoading(false);
                history.push('/');  

            }
            catch{
                setError("Failed to sign up");
            }
    }
    return (
        <CenteredContainer>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign up</h2>
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

                    <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" ref={confirmpasswordRef} required/>
                    </Form.Group>
                    <Button disabled={loading} type="submit" className="w-100 my-3">Sign up</Button>
                </Form>    
            </Card.Body>
        </Card>
        <div className="text-center">
            Already have an Account?<Link to="/login"> Log In</Link>
        </div>
        </CenteredContainer>
    )
}
