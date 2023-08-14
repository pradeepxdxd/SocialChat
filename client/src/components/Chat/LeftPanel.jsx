import React from 'react';
import { Col, Image, InputGroup, FormControl } from 'react-bootstrap';

const LeftPanel = () => {
    return (
        <Col md={4} className="border-right">
            <div className="settings-tray">
                {/* Profile Image */}
                <Image className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/filip.jpg" alt="Profile img" />

                {/* Settings Icons */}
                <div className="settings-tray--right">
                    <i className="material-icons">cached</i>
                    <i className="material-icons">message</i>
                    <i className="material-icons">menu</i>
                </div>
            </div>

            {/* Search Box */}
            <div className="search-box">
                <div className="input-wrapper">
                    <i className="material-icons">search</i>
                    <FormControl placeholder="Search here" type="text" />
                </div>
            </div>

            {/* Friend List */}
            <div className="friend-drawer friend-drawer--onhover">
                <Image className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg" alt="" />
                <div className="text">
                    <h6>Robo Cop</h6>
                    <p className="text-muted">Hey, you're arrested!</p>
                </div>
                <span className="time text-muted small">13:21</span>
            </div>

            {/* Repeat other friend-drawer components here */}
        </Col>
    );
};

export default LeftPanel;
