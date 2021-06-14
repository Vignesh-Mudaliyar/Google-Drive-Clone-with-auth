import React from 'react'
import {Navbar,Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NavbarComponent() {
    return (
        <div>
            <Navbar bg="dark" expand="">
                <Navbar.Brand as={Link} to="/" style={{color:"white"}} className="mx-3"  >
                    Null Drive  
                </Navbar.Brand>
            <Nav.Link as={Link} style={{color:"white",marginRight:"10px"}} to="/user">Profile</Nav.Link>
            </Navbar>
        </div>
    )
}
