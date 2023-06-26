import React, { useState } from 'react'
import { Row, Col, Form, Card, Button } from 'react-bootstrap'
import { useEditProfileMutation } from '../../redux/apis/user'
import Loading from '../Loading/Loading'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function EditForm({ data, setUserDetailsShow }) {
    const [doEditProfile, { isLoading }] = useEditProfileMutation();
    const [image, setImage] = useState();

    const validationSchema = Yup.object().shape({

    });

    const formik = useFormik({
        initialValues : {
            name : data.user.name,
            email : data.user.email,
            phone : data.user.phone,
            address : data.user.address,
            profileImg : data.user.profileImg
        },
        validationSchema,
        onSubmit : data => {
            handleSubmit(data);
            setUserDetailsShow(true);
        }
    })

    const handleSubmit = data => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('address', data.address);
        formData.append('profileImg', image);

        doEditProfile(formData);
    }

    if (isLoading) return <Loading />

    const handleProfileImage = e => {
        if (e.target.files[0]){
            setImage(e.target.files[0]);
        }
        else {
            console.log(' nhi hua')
        }
    }

    return (
        <>
            <Card className="mb-4">
                <Card.Body>
                    <Row>
                        <Col sm={3}>
                            <Form.Label>Full Name</Form.Label>
                        </Col>
                        <Col sm={9}>
                            <Form.Control
                                type="text"
                                name="name"
                                defaultValue={formik.values.name}
                                onChange={formik.handleChange}
                            />
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col sm={3}>
                            <Form.Label>Email</Form.Label>
                        </Col>
                        <Col sm={9}>
                            <Form.Control
                                type="email"
                                name="email"
                                defaultValue={formik.values.email}
                                onChange={formik.handleChange}
                            />
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col sm={3}>
                            <Form.Label>Phone</Form.Label>
                        </Col>
                        <Col sm={9}>
                            <Form.Control
                                type="tel"
                                name="phone"
                                defaultValue={formik.values.phone}
                                onChange={formik.handleChange}
                            />
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col sm={3}>
                            <Form.Label>Address</Form.Label>
                        </Col>
                        <Col sm={9}>
                            <Form.Control
                                type='text'
                                name="address"
                                defaultValue={formik.values.address}
                                onChange={formik.handleChange}
                            />
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col sm={3}>
                            <Form.Label>Profile Picture</Form.Label>
                        </Col>
                        <Col sm={9}>
                            <Form.Control
                                type='file'
                                name="profileImg"
                                onChange={handleProfileImage}
                            />
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col sm={9} className="d-flex justify-content-end">
                            <Button onClick={formik.handleSubmit} variant="primary" style={{ marginRight: '28%' }}>Save</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}
