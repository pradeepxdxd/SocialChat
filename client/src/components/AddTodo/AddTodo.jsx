import React from 'react'
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useAddTodoMutation } from '../../redux/apis/todo'
import Loading from '../Loading/Loading';

export default function AddTodo() {
    const [addTodo, { error, isLoading, isSuccess, data }] = useAddTodoMutation();

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('title is required'),
        message: Yup.string().required('message is required')
    })

    const formik = useFormik({
        initialValues: {
            title: '',
            message: ''
        },
        validationSchema,
        onSubmit: data => {
            addTodo(data);
        }
    })

    if (isLoading) {
        return <Loading/>
    }

    return (
        <>
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col xs={12} sm={8} md={6}>
                        <h3 className='text-center' style={{ fontFamily: "initial", fontStyle: 'revert' }}>Add Todo</h3>
                        {
                            error &&
                            <Alert variant='danger'>
                                {error.data.msg}
                            </Alert>
                        }
                        {
                            isSuccess &&
                            <Alert variant='success'>
                                {data.msg}
                            </Alert>
                        }
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter title"
                                    name='title'
                                    onChange={formik.handleChange}
                                    value={formik.values.title}
                                />
                                <Form.Text>
                                    {
                                        formik.errors.title && formik.touched.title ? <div style={{ color: 'red' }}>{formik.errors.title}</div> : null
                                    }
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="message">
                                <Form.Label>Message</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter message"
                                    name='message'
                                    onChange={formik.handleChange}
                                    value={formik.values.message}
                                />
                                <Form.Text>
                                    {
                                        formik.errors.message && formik.touched.message ? <div style={{ color: 'red' }}>{formik.errors.message}</div> : null
                                    }
                                </Form.Text>
                            </Form.Group>

                            <Button variant="primary" type="submit" className='mt-3'>
                                Add
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
