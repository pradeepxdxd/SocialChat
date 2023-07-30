import React, { useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useSignUpMutation } from '../../redux/apis/auth';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Loading from '../Loaders/Loading'

const SignUp = () => {
    const [doSignUp, { error, isLoading, isSuccess}] = useSignUpMutation();

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Full name is required')
            .matches(/^[a-zA-Z\s]+$/, 'Invalid full name format'),
        email: Yup.string().email('Email is invalid').required('email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(20, 'Password must not exceed 20 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        phone: Yup.string()
            .required('Phone number is required')
            .matches(/^\d{10}$/, 'Phone number must be 10 digits'),
        address: Yup.string().required('Address is required'),
        profileImg: Yup.string()
            .required('Profile Picture is required')
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            address: '',
            profileImg: ''
        },
        validationSchema,
        onSubmit: data => {
            handleSubmit(data);
        }
    })

    useEffect(() => {
        document.title = 'Sign Up';
    }, []);

    if (isLoading) return <Loading/>

    const handleSubmit = values => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('phone', values.phone);
        formData.append('address', values.address);
        formData.append('profileImg', values.profileImg);

        doSignUp(formData);
    }
    
    const handleChange = e => {
        formik.setFieldValue('profileImg', e.target.files[0]);
    }

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col xs={12} sm={8} md={6}>
                    <h3 className='text-center' style={{ fontFamily: "initial", fontStyle: 'revert' }}>Sign Up</h3>
                    {
                        error && <Alert variant='danger'>
                            {error.data.msg}
                        </Alert>
                    }
                    {
                        isSuccess && <Alert variant='success'>
                            Registration Successfully
                        </Alert>
                    }

                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={formik.values.name}
                                name='name'
                                onChange={formik.handleChange}
                            />
                            <Form.Text>
                                {formik.errors.name && formik.touched.name && <><p style={{color:'red'}}>{formik.errors.name}</p></>}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                            />
                            <Form.Text>
                                {formik.errors.email && formik.touched.email && <><p style={{color:'red'}}>{formik.errors.email}</p></>}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                name='password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                            <Form.Text>
                                {formik.errors.password && formik.touched.password && <><p style={{color:'red'}}>{formik.errors.password}</p></>}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="confirmpassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your confirm password"
                                name='confirmPassword'
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                            />
                            <Form.Text>
                                {formik.errors.confirmPassword && formik.touched.confirmPassword && <><p style={{color:'red'}}>{formik.errors.confirmPassword}</p></>}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your Phone"
                                name='phone'
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                            />
                            <Form.Text>
                                {formik.errors.phone && formik.touched.phone && <><p style={{color:'red'}}>{formik.errors.phone}</p></>}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your address"
                                name='address'
                                value={formik.values.address}
                                onChange={formik.handleChange}
                            />
                            <Form.Text>
                                {formik.errors.address && formik.touched.address && <><p style={{color:'red'}}>{formik.errors.address}</p></>}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="profileImg">
                            <Form.Label>Profile Image</Form.Label>
                            <Form.Control
                                type="file"
                                placeholder="Enter your Profile Image"
                                name='profileImg'
                                onChange={handleChange}
                            />
                            <Form.Text>
                                {formik.errors.profileImg && formik.touched.profileImg && <><p style={{color:'red'}}>{formik.errors.profileImg}</p></>}
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit" className='mt-3'>
                            Register
                        </Button>
                    </Form>
                    <div className='mt-3'>
                        <p>Already have an account?<span> <Link to='/'>Login</Link></span></p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUp;
