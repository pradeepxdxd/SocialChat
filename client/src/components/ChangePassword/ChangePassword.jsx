import React, { useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert, Card } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useChangePasswordMutation } from "../../redux/apis/user";
import Loading from "../Loaders/Loading";
import Template from "../Template/Template";

export default function ChangePassword() {
  const [changePassword, { data, isLoading, error, isSuccess }] = useChangePasswordMutation();

  let validationSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .required("change password is required")
      .min(6, "password must be at least 6 characters")
      .max(20, "password must not exceed 20 characters"),
    newPassword: Yup.string()
      .required("new password is required")
      .min(6, "password must be at least 6 characters")
      .max(20, "password must not exceed 20 characters"),
    confirmPassword: Yup.string()
      .required("confirm password is required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (data) => {
      changePassword(data);
    },
  });

  useEffect(() => {
    document.title = 'Change Password';
  }, [])

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      {isSuccess ? (
        <Template props={data.msg} path={"/profile"} pathText={"Profile"} />
      ) : (
        <Row className="justify-content-center mt-5">
          <Col xs={12} sm={8} md={6}>
            {error && <Alert variant="danger">{error.data.msg}</Alert>}
            <Card>
              <Card.Body>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group controlId="currentPassword">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      name="currentPassword"
                      type="password"
                      placeholder="Enter current password"
                      value={formik.values.currentPassword}
                      onChange={formik.handleChange}
                      required
                    />
                    <Form.Text>
                      {formik.errors.currentPassword && formik.touched.currentPassword ? (
                        <p style={{ color: "red" }}>{formik.errors.currentPassword}</p>
                      ) : null}
                    </Form.Text>
                  </Form.Group>

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
      )}
    </Container>
  );
}
