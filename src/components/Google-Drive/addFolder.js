// import { Modal } from 'bootstrap';
import React, { useState } from 'react'
import { Container,Button, Modal, Form } from 'react-bootstrap';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import {database} from '../../firebase';
import {useAuth} from '../../Contexts/authcontext';
import {ROOT_FOLDER} from '../../hooks/useFolder'

export default function AddFolder({currentFolder}) {
    const [open,setopen] = useState(false);
    const [name,setName] = useState("");
    const {userState} = useAuth();
    const openmodal = (e)=>{
        setopen(true);
    }
    const closemodal = ()=>{
        setopen(false);
    }

    const handleSubmit =(e)=>{
        e.preventDefault();
        if(currentFolder === null) return

        const path = [...currentFolder.path];

        if(currentFolder !== ROOT_FOLDER)
        {
            path.push({name: currentFolder.name,id: currentFolder.id});
        }

        database.folders.add({
            name:name,
            parentId: currentFolder.id,
            userId: userState.uid,
            path: path,
            createdAt : database.getCurrentTimestamp()
        })

        setName("");
        closemodal();
    }
    return (
        <Container fluid>
            <Button onClick={openmodal} variant="outline-primary my-2" size="sm" style={{marginRight:"15px"}} >
            <CreateNewFolderIcon style={{fontSize:"30px"}}/>
            </Button>

            <Modal show={open} onHide={closemodal}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Name :</Form.Label>
                            <Form.Control type="text" value={name} onChange={(e) => {setName(e.target.value)
                            }} required/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={closemodal} >Close</Button>
                        <Button variant="outline-primary" type="submit" >Create</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    )
}
