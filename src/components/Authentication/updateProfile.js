// import { Alert } from 'bootstrap';
import {React, useRef, useState} from 'react'
import {Card,Form,Button,Alert} from "react-bootstrap";
import {useAuth} from '../../Contexts/authcontext';
import CenteredContainer  from './centeredContainer';
import {Link, useHistory} from 'react-router-dom'

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmpasswordRef = useRef();
    const {userState,emailUpdate,passwordUpdate } = useAuth();
    const [error,setError] =useState();
    const [loading,setLoading] = useState(false);
    const history = useHistory();
    const handleSubmit  =  (e)=>{
        e.preventDefault();
            if(passwordRef.current.value !== confirmpasswordRef.current.value)
            {
                return setError("Password do not match");
            }

            setError("");
            setLoading(true);
            const promises = [];
            console.log(userState.email);   
            if(emailRef.current.value !== userState.email)
            {
                promises.push(emailUpdate(emailRef.current.value));
            }
            
            if(passwordRef.current.value)
            {
                promises.push(passwordUpdate(passwordRef.current.value));
            }

            Promise.all(promises).then(()=>{
                history.push('/user');
            }).catch(()=>{
                setError("Failed to update Profile");
            }).finally(()=>{
                setLoading(false);
            })

    }
    return (
        <CenteredContainer>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Update Profile</h2>
                {error && <Alert variant="danger" >{error}</Alert>}
                  <Form onSubmit={handleSubmit}>
                     <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} defaultValue={userState.email} />
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} placeholder="keep blank to not change" />
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" ref={confirmpasswordRef} placeholder="keep blank to not change" />
                    </Form.Group>
                    <Button disabled={loading} type="submit" className="w-100 my-3">Update</Button>
                </Form>    
            </Card.Body>
        </Card>
        <div className="text-center">
            <Link to="/user">Cancel</Link>
        </div>
        </CenteredContainer>
    )
}
