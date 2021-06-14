import React, { useState } from 'react'
import {Card,Form,Button,Alert} from 'react-bootstrap';
import {useAuth} from '../../Contexts/authcontext';
import CenteredContainer  from './centeredContainer';
import {useHistory ,Link } from 'react-router-dom';
export default function Profile() {
    
    const {logout,userState} = useAuth();
    const history =useHistory();
    const [error,setError] = useState();

    const handleLogout = async  (e)=>{
        e.preventDefault();
        setError("");
        try{
           await logout();
            history.push('/login');
        }
        catch{
            setError("Logout Failed");
        }

    }
    return (
        <CenteredContainer>
        <Card>
            <Card.Body>
                <h2 className="text-center">Profile</h2>
                {error && <Alert varient="danger">error</Alert>}
                <div className="text-center"><strong>Email :</strong> {userState.email}</div>
                <Link to="/update-profile" className="btn btn-primary mt-2 w-100"> Update Profile</Link>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            <Button varient="link"  onClick={handleLogout}>Log Out</Button>
        </div>
        </CenteredContainer>
    )
}
