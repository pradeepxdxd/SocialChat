import React, { useEffect } from "react";
import { getToken, tokenDecode } from "../../utils/common";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlices";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import './Dashboard.css'

export default function Dashboard() {
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = "Dashboard";
        const token = getToken();
        const decodeToken = tokenDecode(token);
        dispatch(setUser({ name: decodeToken.name, token: token }));
    }, [dispatch]);

    return (
        <>
            <div className="mt-5">
                <Container fluid>
                    <Row>
                        <Col md={3} className="sidebar">
                            <h2>Dashboard Sidebar</h2>
                            <ul>
                                <li>Dashboard</li>
                                <li>Charts</li>
                                <li>Tables</li>
                            </ul>
                        </Col>
                        <Col md={9} className="content">
                            <Card>
                                <Card.Header>
                                    <h3>Welcome to Your Dashboard</h3>
                                </Card.Header>
                                <Card.Body>
                                    <p>This is a sample content for your dashboard.</p>
                                    <Button variant="primary">Learn More</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}
