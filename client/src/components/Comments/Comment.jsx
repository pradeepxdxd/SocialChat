import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './Comment.css'
import CommentsData from './CommentsData';

export default function Comment({ show, setShow }) {
    const [showReply, setShowReply] = useState(false);

    const handleClose = () => {
        setShow(false);
    }

    const handleReply = () => {
        setShowReply(showReply ? false : true);
    }

    const demoComments = [
        {
            id: 1,
            name: "John Doe",
            profileImg: "https://via.placeholder.com/50",
            content: "This is a great post!",
            replies: [
                { id: 11, name: "Alice Smith", content: "I agree with you!" },
                { id: 12, name: "Pradeep Biswas", content: "I agree :)" },
            ]
        },
        {
            id: 2,
            name: "Nattu Smith",
            profileImg: "https://via.placeholder.com/50",
            content: "I totally agree with your points.",
            replies: [
                { id: 13, name: "Undertaker", content: "why are you ready now!" },
                { id: 14, name: "Goldberg", content: "You are next" },
            ]
        },
        {
            id: 3,
            name: "Napa Smith",
            profileImg: "https://via.placeholder.com/50",
            content: "I totally agree with your points.",
            replies: []
        },
        {
            id: 4,
            name: "Prade Smith",
            profileImg: "https://via.placeholder.com/50",
            content: "I totally agree with your points.",
            replies: []
        },
        {
            id: 5,
            name: "Chande Smith",
            profileImg: "https://via.placeholder.com/50",
            content: "I totally agree with your points.",
            replies: []
        },
        {
            id: 6,
            name: "Panga Smith",
            profileImg: "https://via.placeholder.com/50",
            content: "I totally agree with your points.",
            replies: []
        },
    ];

    return (
        <>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Comments
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '500px', overflowY: 'auto' }}>
                    <div>
                        {/* Display demo comments */}
                        {demoComments.map(comment => (
                            <CommentsData comment={comment} />
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="comment-input-container">
                        <input type='text' placeholder="Enter your comment" className="comment-input" />
                        <Button variant="primary" onClick={handleClose} className="comment-send-button">
                            <FontAwesomeIcon icon={faPaperPlane} /> Send
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}
