import React, { useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { ToastContainer } from 'react-toastify'
import { useAddPostMutation } from "../../redux/apis/post";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loading from "../Loaders/Loading";
import 'react-toastify/dist/ReactToastify.css';
import { toastSuccess } from '../../utils/alerts'

const AddPost = () => {
    const [addPost, { data: postData, error, isLoading, isSuccess }] = useAddPostMutation();

    useEffect(() => {
        document.title = "Add Post";
    }, []);

    const validationSchema = Yup.object().shape({
        post: Yup.string().required("Profile Picture is required"),
    });

    const formik = useFormik({
        initialValues: {
            location: "",
            caption: "",
            post: "",
        },
        validationSchema,
        onSubmit: (data) => {
            toastSuccess('Post Successfully Added')
            handleSubmit(data);
            // if (!error.data.msg) {
            //     toastSuccess(postData.msg)
            // }
            // else {
            //     toastFailer(error.data.msg)
            // }
        },
    });

    if (isLoading) return <Loading />;

    const handleSubmit = (values) => {
        const formData = new FormData();
        formData.append("location", values.location);
        formData.append("caption", values.caption);
        formData.append("post", values.post);

        addPost(formData);
    };

    return (
        <Container>
            <ToastContainer />
            <Row className="justify-content-center mt-5">
                <Col xs={12} sm={8} md={6}>
                    <h3
                        className="text-center mt-5"
                        style={{ fontFamily: "initial", fontStyle: "revert" }}
                    >
                        Add Post
                    </h3>
                    {isSuccess && <Alert variant="success">{postData.msg}</Alert>}
                    {error && <Alert variant="danger">{error.data.msg}</Alert>}
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group controlId="location">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your location"
                                value={formik.values.location}
                                name="location"
                                onChange={formik.handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="caption">
                            <Form.Label>Caption</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="caption"
                                placeholder="Enter a caption"
                                value={formik.values.caption}
                                onChange={formik.handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="post">
                            <Form.Label>Post</Form.Label>
                            <Form.Control
                                type="file"
                                placeholder="Enter your post"
                                name="post"
                                onChange={(event) => {
                                    const file = event.currentTarget.files[0];
                                    formik.setFieldValue("post", file);
                                }}
                            />
                            <Form.Text>
                                {formik.errors.profileImg && formik.touched.profileImg && (
                                    <>
                                        <p style={{ color: "red" }}>{formik.errors.profileImg}</p>
                                    </>
                                )}
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            Add Post
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddPost;
