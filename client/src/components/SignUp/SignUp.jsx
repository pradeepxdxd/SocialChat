import React, { useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSignUpMutation } from '../../redux/apis/auth';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Loading from '../Loaders/Loading'
import './SignUp.css'

const SignUp = () => {
    const [doSignUp, { error, isLoading, isSuccess }] = useSignUpMutation();

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

    if (isLoading) return <Loading />

    const handleSubmit = values => {
        console.log(values)
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
        <>
            <div className='center-signup-page mt-5'>
                <Form className="form_main" onSubmit={formik.handleSubmit}>
                    <p className="heading">Sign Up</p>
                    {
                        error && <Alert variant='danger' style={{width : '321px'}}>
                            {error.data.msg}
                        </Alert>
                    }
                    {
                        isSuccess && <Alert variant='success' style={{width : '321px'}}>
                            Registration Successfully
                        </Alert>
                    }
                    <Form.Group controlId="name" className='inputContainer'>
                        <Form.Control
                            className='inputField'
                            type="text"
                            placeholder="Enter your name"
                            value={formik.values.name}
                            name='name'
                            onChange={formik.handleChange}
                        />
                        <Form.Text>
                            {formik.errors.name && formik.touched.name && <><p style={{ color: 'red' }}>{formik.errors.name}</p></>}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="email" className='inputContainer'>
                        <Form.Control
                            className='inputField'
                            type="email"
                            placeholder="Enter your email"
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        <Form.Text>
                            {formik.errors.email && formik.touched.email && <><p style={{ color: 'red' }}>{formik.errors.email}</p></>}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="password" className='inputContainer'>
                        <Form.Control
                            className='inputField'
                            type="password"
                            placeholder="Enter your password"
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        <Form.Text>
                            {formik.errors.password && formik.touched.password && <><p style={{ color: 'red' }}>{formik.errors.password}</p></>}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="confirmpassword" className='inputContainer'>
                        <Form.Control
                            type="password"
                            placeholder="Enter your confirm password"
                            name='confirmPassword'
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            className='inputField'
                        />
                        <Form.Text>
                            {formik.errors.confirmPassword && formik.touched.confirmPassword && <><p style={{ color: 'red' }}>{formik.errors.confirmPassword}</p></>}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="phone" className='inputContainer'>
                        <Form.Control
                            className='inputField'
                            type="text"
                            placeholder="Enter your Phone"
                            name='phone'
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                        />
                        <Form.Text>
                            {formik.errors.phone && formik.touched.phone && <><p style={{ color: 'red' }}>{formik.errors.phone}</p></>}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="address" className='inputContainer'>
                        <Form.Control
                            type="text"
                            className='inputField'
                            placeholder="Enter your address"
                            name='address'
                            value={formik.values.address}
                            onChange={formik.handleChange}
                        />
                        <Form.Text>
                            {formik.errors.address && formik.touched.address && <><p style={{ color: 'red' }}>{formik.errors.address}</p></>}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="profileImg" className='inputContainer'>
                        <Form.Control
                            className='inputField'
                            type="file"
                            placeholder="Enter your Profile Image"
                            name='profileImg'
                            onChange={handleChange}
                        />
                        <Form.Text>
                            {formik.errors.profileImg && formik.touched.profileImg && <><p style={{ color: 'red' }}>{formik.errors.profileImg}</p></>}
                        </Form.Text>
                    </Form.Group>
                    <Button id="button" type="submit">Sign Up</Button>
                    <Row className="mt-2">
                        <Col className="d-flex justify-content-end">
                            <div className="signupContainer">
                                <p>Already have an account? <Link to='/'>Login</Link></p>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    );
};

export default SignUp;
