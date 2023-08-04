import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './Comment.css'
import CommentsData from './CommentsData';
import InfinityScroller from '../InfinityScrollerForComment/InfinityScroller'
import { getComments } from '../../redux/thunk/comment'

export default function Comment({ show, setShow, postId }) {
    const [showReply, setShowReply] = useState(false);

    const handleClose = () => {
        setShow(false);
    }

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
                        <InfinityScroller api={getComments} limit={3} postId={postId} Template={CommentsData}/>
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
