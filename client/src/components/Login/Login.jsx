import React, { useEffect } from 'react'
import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { useLoginMutation } from '../../redux/apis/auth'
import { Link, useNavigate } from 'react-router-dom'
import { isLoggedIn, tokenDecode } from '../../utils/common'
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/authSlices'
import Loading from '../Loading/Loading'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [doLogin, { isLoading, error, isError, isSuccess, data }] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/dashboard');
        }
        else navigate('/');
    }, [navigate]);

    const handleSubmit = e => {
        e.preventDefault();
        doLogin({ email, password });
    }

    if (isLoading) {
        return <Loading />
    }
    else if (isSuccess) {
        const decode = tokenDecode(data.token);
        dispatch(setUser({ name: decode.name, token: data.token }));
        navigate('/dashboard');
    }

    return (
        <>
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col xs={12} sm={8} md={6}>
                        <h3 className='text-center' style={{ fontFamily: "initial", fontStyle: 'revert' }}>Login</h3>
                        <Form onSubmit={handleSubmit}>
                            {
                                isError && <Alert variant='danger'>
                                    {error.data.msg}
                                </Alert>
                            }

                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className='mt-3'>
                                Login
                            </Button>
                        </Form>
                        <div>
                            <Row>
                                <Col>
                                    <p className="mt-3">
                                        <Link to='/forget_password'> Forget Password</Link>
                                    </p>
                                </Col>
                                <Col>
                                    <p className='mt-3'>Don't have an account?<span><Link to='/signup'> SignUp</Link></span></p>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
