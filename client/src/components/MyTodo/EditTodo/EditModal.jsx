import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {useEditTodoMutation} from '../../../redux/apis/todo'
import Loading from '../../Loading/Loading'

function EditModal({ todo, setShow, show }) {
    const [title, setTitle] = useState(todo.title);
    const [message, setMessage] = useState(todo.message);

    const [doEdit, {isLoading}] = useEditTodoMutation();

    const handleClose = () => setShow(false);

    const handleChange = () => {
        todo = {
            ...todo,
            title,
            message
        }
        doEdit(todo);
        setShow(false);
    }

    if (isLoading) return <Loading/>

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="email"
                                autoFocus
                                defaultValue={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" defaultValue={message} onChange={e => setMessage(e.target.value)} rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleChange}>
                        Change
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditModal;