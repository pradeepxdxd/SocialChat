import React from "react";
import { Form, Button, Container, Row, Col, Alert, Card } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loading from "../Loading/Loading";
import { useResetPasswordMutation } from '../../redux/apis/user'
import { useParams } from 'react-router-dom'
import Template from "../Template/Template";

export default function ResetPassword() {
  const { token } = useParams();
  const [doResetPassword, { data, error, isSuccess, isLoading }] = useResetPasswordMutation();
  let validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required("new password is required")
      .min(6, "password must be atleast 6 characters")
      .max(20, "password must not exceed 20 characters"),
    confirmPassword: Yup.string()
      .required("confirm password is required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (data) => {
      doResetPassword({ data, token });
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {isSuccess ? (
        <Template props={data.msg} path={'/'} pathText={'Login'} />
      ) : (
        <Container>
          <Row className="justify-content-center mt-5">
            <Col xs={12} sm={8} md={6}>
              <Card>
                <Card.Body>
                  <div className="text-center">
                    <h1>Reset Password</h1>
                  </div>
                  {error && <Alert variant="danger">{error.data.msg}</Alert>}
                  <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="newPassword">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        name="newPassword"
                        type="password"
                        placeholder="Enter new password"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        required
                      />
                      <Form.Text>
                        {formik.errors.newPassword && formik.touched.newPassword ? (
                          <p style={{ color: "red" }}>{formik.errors.newPassword}</p>
                        ) : null}
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        required
                      />
                      <Form.Text>
                        {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                          <p style={{ color: "red" }}>{formik.errors.confirmPassword}</p>
                        ) : null}
                      </Form.Text>
                    </Form.Group>

                    <div className="mt-3 text-center">
                      <Button variant="primary" type="submit">
                        Change Password
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
