import React from "react";
import { Container, Row, Col, Form, Button, Alert, Card } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useForgetPasswordMutation } from "../../redux/apis/user";
import Loading from "../Loading/Loading";
import Template from "../Template/Template";

function ForgetPassword() {
  const [doForget, { data, isLoading, isSuccess, error }] = useForgetPasswordMutation();

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("please enter correct email").required("email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (data) => {
      doForget(data);
    },
  });

  if (isLoading) return <Loading />;

  return (
    <>
      {isSuccess ? (
        <Template props={data.msg} path={"/"} pathText={"Login"} />
      ) : (
        <Container>
          <Row className="justify-content-center mt-5">
            <Col md={6}>
              <Card>
                <Card.Body>
                  <div className="text-center">
                    <h1>Password Reset</h1>
                  </div>
                  {error && <Alert variant="danger">{error.data.msg}</Alert>}
                  <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        type="email"
                        placeholder="Enter your email"
                      />
                      <Form.Text>
                        {formik.errors.email && formik.touched.email ? (
                          <p style={{ color: "red" }}>{formik.errors.email}</p>
                        ) : null}
                      </Form.Text>
                    </Form.Group>
                    <div className="text-center mt-3">
                      <Button variant="primary" type="submit">
                        Reset Password
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default ForgetPassword;
