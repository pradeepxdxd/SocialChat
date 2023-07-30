import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Template = ({ props, path, pathText }) => {
    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }} className="text-center mt-5">
                    <Card>
                        <Card.Body>
                            <h1 style={{ color: 'green' }}>{props}</h1>
                            {/* <p>This is a sample message page.</p> */}
                            <Button as={Link} to={path} variant="primary">
                                Go to {pathText}
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Template;
