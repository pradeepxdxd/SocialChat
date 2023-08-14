import React from 'react';
import { Col, Image } from 'react-bootstrap';

const RightPanel = () => {
    return (
        <Col md={8}>
            <div className="settings-tray">
                <div className="friend-drawer no-gutters friend-drawer--grey">
                    <Image className="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/robocop.jpg" alt="" />
                    <div className="text">
                        <h6>Robo Cop</h6>
                        <p className="text-muted">Layin' down the law since like before Christ...</p>
                    </div>
                    <span className="settings-tray--right">
                        <i className="material-icons">cached</i>
                        <i className="material-icons">message</i>
                        <i className="material-icons">menu</i>
                    </span>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="chat-panel">
                {/* Repeat chat-bubble components here */}
            </div>

            {/* Chat Box Tray */}
            <div className="chat-box-tray">
                <i className="material-icons">sentiment_very_satisfied</i>
                <input type="text" placeholder="Type your message here..." />
                <i className="material-icons">mic</i>
                <i className="material-icons">send</i>
            </div>
        </Col>
    );
};

export default RightPanel;
